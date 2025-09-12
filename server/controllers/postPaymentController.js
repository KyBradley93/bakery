const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const paymentModel = require('../models/postPaymentModel');

const postPayment = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const checkout_id = session.metadata.checkout_id;

    try {
      await paymentModel.markCheckoutPaid(checkout_id);

      const cart_id = await paymentModel.getCartIdByCheckoutId(checkout_id);
      if (cart_id) {
        await paymentModel.deleteCartItemsByCartId(cart_id);
      }
    } catch (dbError) {
      console.error('❌ Failed to update checkout row:', dbError);
    }
  }

  res.json({ received: true });
};

module.exports = { postPayment };
