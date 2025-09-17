const pool = require('../db');
//const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const getCart = async (customer_id) => {
    try {
        const res = await pool.query('SELECT * FROM cart WHERE customer_id = $1', [customer_id]);
        return res.rows;
    } catch (error) {
        console.log(`Error in cartModel: ${error}`);
    }
};

const getCartProducts = async (customer_id) => {
    try {
        const cart = await pool.query('SELECT * FROM cart WHERE customer_id = $1', [customer_id]);
        cart_id = cart.rows[0].cart_id;

        const res = await pool.query('SELECT * FROM cart_products WHERE cart_id = $1', [cart_id]);
        return res.rows;
    } catch (error) {
        console.log(`Error in cartModel: ${error}`);
    }
};

const deleteProductFromCart = async (customer_id, product_id) => {
    try {
        // finds cart id
        let cartResult = await pool.query('SELECT * FROM cart WHERE customer_id = $1', [customer_id]);
        let cart_id;

        if (cartResult.rows.length === 0) {
            res.status(400).send({ error: 'No Cart Found' });
        } else {
            cart_id = cartResult.rows[0].id;
        }

        await pool.query(
            'DELETE FROM cart_products WHERE cart_id = $1 AND product_id = $2',
            [cart_id, product_id]
        );
    } catch (error) {
        console.log(`Error in cartModel: ${error}`);
    }
};

const deleteCustomProductFromCart = async (customer_id, custom_product_id) => {
    try {
        // finds cart id
        let cartResult = await pool.query('SELECT * FROM cart WHERE customer_id = $1', [customer_id]);
        let cart_id;

        if (cartResult.rows.length === 0) {
            res.status(400).send({ error: 'No Cart Found' });
        } else {
            cart_id = cartResult.rows[0].id;
        }

        await pool.query(
            'DELETE FROM cart_productss WHERE cart_id = $1 AND custom_product_id = $2',
            [cart_id, custom_product_id]
        );
    } catch (error) {
        console.log(`Error in cartModel: ${error}`);
    }
};

const getCustomerPointsAsCurrency = async (customer_id) => {
  const client = await pool.connect();
  const POINTS_TO_DOLLAR_RATE = 100;

  try {
    const query = `
      SELECT points
      FROM profile_points
      WHERE customer_id = $1
    `;
    const result = await client.query(query, [customer_id]);

    if (result.rows.length === 0) {
      return 0.0; // No points found
    }

    const points = result.rows[0].points;
    const discount = points / POINTS_TO_DOLLAR_RATE;

    return parseFloat(discount.toFixed(2)); // Ensure numeric(10,2)
  } catch (err) {
    throw new Error(`Failed to fetch profile points: ${err.message}`);
  } finally {
    client.release();
  }
};


const finalizeCheckout = async (cart_id, customer_id, usePoints = false) => {
  const client = await pool.connect(); // Use a dedicated client for transaction

  try {
    await client.query('BEGIN');

    // Step 1: Insert into checkout
    const insertCheckoutQuery = `
      INSERT INTO checkout (customer_id, cart_id)
      VALUES ($1, $2)
      RETURNING id
    `;
    const resCheckout = await client.query(insertCheckoutQuery, [customer_id, cart_id]);
    const checkout_id = resCheckout.rows[0].id;

    // Step 2a: Fetch standard products
    const standardProductsQuery = `
      SELECT cp.product_id, cp.quantity, p.price
      FROM cart_products cp
      JOIN products p ON cp.product_id = p.id
      WHERE cp.cart_id = $1 AND cp.product_id IS NOT NULL
    `;
    const resStandard = await client.query(standardProductsQuery, [cart_id]);
    const standardItems = resStandard.rows;

    // Step 2b: Fetch custom products
    const customProductsQuery = `
      SELECT cp.custom_product_id, cp.quantity, c.price
      FROM cart_products cp
      JOIN custom_products c ON cp.custom_product_id = c.id
      WHERE cp.cart_id = $1 AND cp.custom_product_id IS NOT NULL
    `;
    const resCustom = await client.query(customProductsQuery, [cart_id]);
    const customItems = resCustom.rows;

    // Step 3a: Insert standard products into checkout_products
    const insertStandardItemQuery = `
      INSERT INTO checkout_products (checkout_id, product_id, quantity, unit_price)
      VALUES ($1, $2, $3, $4)
    `;
    for (const item of standardItems) {
      await client.query(insertStandardItemQuery, [
        checkout_id,
        item.product_id,
        item.quantity,
        item.price
      ]);
    }

    // Step 3b: Insert custom products into checkout_products
    const insertCustomItemQuery = `
      INSERT INTO checkout_products (checkout_id, custom_product_id, quantity, unit_price)
      VALUES ($1, $2, $3, $4)
    `;
    for (const item of customItems) {
      await client.query(insertCustomItemQuery, [
        checkout_id,
        item.custom_product_id,
        item.quantity,
        item.price
      ]);
    }

    // Step 4: Calculate total
    const standardTotal = standardItems.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
    );
    const customTotal = customItems.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
        );
    let total = standardTotal + customTotal;

    // Step 4b: Apply profile points if enabled
    let discountUsed = 0.0;
    const POINTS_TO_DOLLAR_RATE = 100;

    if (usePoints) {
        discountUsed = await getCustomerPointsAsCurrency(customer_id);
        total = Math.max(0, total - discountUsed); // Prevent negative totals
    }

    // Step 5: Update checkout total
    const updateTotalQuery = `
      UPDATE checkout
      SET total_price = $1
      WHERE id = $2
    `;
    await client.query(updateTotalQuery, [total, checkout_id]);

    // ✅ Step 5b: Deduct points used (inside transaction!)
    if (usePoints && discountUsed > 0) {
      const pointsToDeduct = Math.round(discountUsed * POINTS_TO_DOLLAR_RATE);
      await client.query(
        `UPDATE profile_points SET points = points - $1 WHERE customer_id = $2`,
        [pointsToDeduct, customer_id]
      );
    }

    // Step 6: Clear cart
    const clearCartQuery = `
      DELETE FROM cart_products
      WHERE cart_id = $1
    `;
    await client.query(clearCartQuery, [cart_id]);

    await client.query('COMMIT');

    // --- STRIPE CHECKOUT SESSION LOGIC ---
    // Build line_items for Stripe
    //const line_items = [
    //  ...standardItems.map(item => ({
    //    price_data: {
    //      currency: 'usd',
    //      product_data: { name: `Product #${item.product_id}` },
    //      unit_amount: Math.round(item.price * 100),
    //    },
    //    quantity: item.quantity,
    //  })),
    //  ...customItems.map(item => ({
    //    price_data: {
    //      currency: 'usd',
    //      product_data: { name: `Custom Product #${item.custom_product_id}` },
    //      unit_amount: Math.round(item.price * 100),
    //    },
    //    quantity: item.quantity,
    //  }))
    //];

    // Only create a session if total > 0
    //let session = null;
    //if (total > 0) {
    //  session = await stripe.checkout.sessions.create({
    //    payment_method_types: ['card'],
    //    mode: 'payment',
    //    line_items,
    //    success_url: `http://localhost:3000/success?id=${checkout_id}`,
    //    cancel_url: 'http://localhost:3000/',
     //   metadata: { checkout_id: checkout_id.toString() },
     // });
    //}

    return {
      checkout_id,
      stripe_url: null
    };
    

  } catch (err) {
    await client.query('ROLLBACK');
    throw new Error(`Checkout failed: ${err.message}`);
  } finally {
    client.release();
  }
};


module.exports = {
  getCart,
  getCartProducts,
  deleteProductFromCart,
  deleteCustomProductFromCart,
  finalizeCheckout
};
