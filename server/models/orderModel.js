const pool = require('../db');

const getProducts = async () => {
    try {
        const res = await pool.query('SELECT * FROM products');
        return res.rows;
    } catch (error) {
        console.log(`Error in orderModel: ${error}`);
    }
};

const getProductsByType = async (product_type_id) => {
    try {
        const res = await pool.query('SELECT * FROM products WHERE product_type_id = $1', [product_type_id]);
        return res.rows;
    } catch (error) {
        console.log(`Error in orderModel: ${error}`);
    }
};

const getProductTypes = async () => {
    try {
        const res = await pool.query('SELECT * FROM product_types');
        return res.rows;
    } catch (error) {
        console.log(`Error in orderModel: ${error}`);
    }
};

const getCustomProductSizes = async () => {
    try {
        const res = await pool.query('SELECT * FROM custom_product_sizes');
        return res.rows;
    } catch (error) {
        console.log(`Error in orderModel: ${error}`);
    }
};

const getCustomProductBases = async () => {
    try {
        const res = await pool.query('SELECT * FROM custom_product_bases');
        return res.rows;
    } catch (error) {
        console.log(`Error in orderModel: ${error}`);
    }
};

const getCustomProductVariants = async () => {
    try {
        const res = await pool.query('SELECT * FROM custom_product_variants');
        return res.rows;
    } catch (error) {
        console.log(`Error in orderModel: ${error}`);
    }
};

const getCustomProductAddOns = async () => {
    try {
        const res = await pool.query('SELECT * FROM custom_product_add_ons');
        return res.rows;
    } catch (error) {
        console.log(`Error in orderModel: ${error}`);
    }
};

const getCustomProducts = async () => {
    try {
        const res = await pool.query('SELECT * FROM custom_products');
        return res.rows;
    } catch (error) {
        console.log(`Error in orderModel: ${error}`);
    }
};

const getCustomProductOrderAddOns = async () => {
    try {
        const res = await pool.query('SELECT * FROM custom_product_order_add_ons');
        return res.rows;
    } catch (error) {
        console.log(`Error in orderModel: ${error}`);
    }
};

const addProductToCart = async (customer_id, product_id, quantity) => {
    try {
        // Ensure users cart exists
        let cartResult = await pool.query('SELECT * FROM cart WHERE customer_id = $1', [customer_id]);
        let cart_id;

        //makes new cart id if user has no cart
        if (cartResult.rows.length === 0) {
            const newCart = await pool.query('INSERT INTO cart (customer_id) VALUES ($1) RETURNING id', [customer_id]);
            cart_id = newCart.rows[0].id;
        } else {
            cart_id = cartResult.rows[0].id;
        }

        await pool.query(
            'INSERT INTO cart_products (cart_id, product_id, quantity) VALUES ($1, $2, $3)',
            [cart_id, product_id, quantity]
        );
        
        return res.json();
    } catch (error) {
        console.log(`Error in orderModel: ${error}`);
    }
};

const addCustomProductToCart = async (customer_id, custom_product_id, quantity) => {
    try {
        // Ensure users cart exists
        let cartResult = await pool.query('SELECT * FROM cart WHERE customer_id = $1', [customer_id]);
        let cart_id;

        //makes new cart id if user has no cart
        if (cartResult.rows.length === 0) {
            const newCart = await pool.query('INSERT INTO cart (customer_id) VALUES ($1) RETURNING id', [customer_id]);
            cart_id = newCart.rows[0].id;
        } else {
            cart_id = cartResult.rows[0].id;
        }

        await pool.query(
            'INSERT INTO cart_products (cart_id, custom_product_id, quantity) VALUES ($1, $2, $3)',
            [cart_id, custom_product_id, quantity]
        );
        
        return res.json();
    } catch (error) {
        console.log(`Error in orderModel: ${error}`);
    }
};


module.exports = {
getProducts,
getProductsByType,
getProductTypes,
getCustomProductSizes,
getCustomProductBases,
getCustomProductVariants,
getCustomProductAddOns,
getCustomProducts,
getCustomProductOrderAddOns,
addProductToCart,
addCustomProductToCart
};
