require('dotenv').config();
//const Stripe = require('stripe');
//const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const PaymentModel = require('../models/paymentModel');
const CartModel = require('../models/cartModel');


const handlePayment = async (req, res) => {
  const customer_id = req.customer.id;
  const { usePoints = false } = req.body;
  

  try {
    // Get the latest cart for the customer
    const cart_id = await PaymentModel.getLatestCartId(customer_id);

    // Call finalizeCheckout, which now handles Stripe session creation
    const { checkout_id, stripe_url } = await CartModel.finalizeCheckout(cart_id, customer_id, usePoints);

    if (stripe_url) {
      res.json({ url: stripe_url });
    } else {
      // If total is zero (all points), just return success
      res.json({ message: 'Checkout complete with points', checkout_id });
    }
  } catch (err) {
    console.error('❌ Error in handlePayment:', err);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
};

module.exports = {
  handlePayment,
};