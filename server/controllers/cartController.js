const CartModel = require('../models/cartModel');

const getCart = async (req, res) => {
    try {
        const cart = CartModel.getCart()
        res.json(cart);
    } catch (err) {
        console.error('error in cartController', err);
        res.status(500).json({ message: 'cartController error'});
    }
};

const deleteProductFromCart = async (req, res) => {
    const { customer_id, product_id } = req.body;

    try {
        const itemToDelete = await CartModel.deleteProductFromCart({ customer_id, product_id });
        res.status(200).json(`Deleted: ${itemToDelete}`);
    } catch (err) {
        console.error('error in cartController', err);
        res.status(500).json({ message: 'cartController error'});
    }
};

const deleteCustomProductFromCart = async (req, res) => {
    const { customer_id, custom_product_id } = req.body;

    try {
        const itemToDelete = await CartModel.deleteCustomProductFromCart({ customer_id, custom_product_id });
        res.status(200).json(`Deleted: ${itemToDelete}`);
    } catch (err) {
        console.error('error in cartController', err);
        res.status(500).json({ message: 'cartController error'});
    }
};

const finalizeCheckout = async (req, res) => {
    const { cart_id, customer_id, usePoints } = req.body;
    usePoints = false;

    try {
        await CartModel.finalizeCheckout({ cart_id, customer_id });
        res.status(200).json({ message: 'Checkout Completed'});
    } catch (err) {
        console.error('error in cartController', err);
        res.status(500).json({ message: 'cartController error'});
    }
};

module.exports = {
  getCart,
  deleteProductFromCart,
  deleteCustomProductFromCart,
  finalizeCheckout
};

