const CartModel = require('../models/cartModel');

const getCart = async (req, res) => {
    try {
        const customer_id = req.customer?.id;

        if (!customer_id) {
            return res.status(400).json({ message: 'Missing customer ID' });
        }

        const cart = await CartModel.getCart(customer_id)
        res.status(200).json(cart);
    } catch (err) {
        console.error('error in cartController', err);
        res.status(500).json({ message: 'cartController error'});
    }
};

const getCartProducts = async (req, res) => {
    try {
        const customer_id = req.customer?.id;

        if (!customer_id) {
            return res.status(400).json({ message: 'Missing customer ID' });
        }

        const cartProducts = await CartModel.getCartProducts(customer_id)
        res.status(200).json(cartProducts);
    } catch (err) {
        console.error('error in cartController', err);
        res.status(500).json({ message: 'cartController error'});
    }
};

const deleteProductFromCart = async (req, res) => {
    const { product_id } = req.body;
    const customer_id = req.customer?.id;

    if (!customer_id) {
        return res.status(400).json({ message: 'Missing customer ID' });
    }

    if (!product_id) {
        return res.status(400).json({ message: 'Product ID is required' });
    }

    try {
        await CartModel.deleteProductFromCart({ customer_id, product_id });
        res.status(200).json({ message: `Deleted product ${product_id} from cart` });
    } catch (err) {
        console.error('error in cartController', err);
        res.status(500).json({ message: 'cartController error'});
    }
};

const deleteCustomProductFromCart = async (req, res) => {
    const { custom_product_id } = req.body;
    const customer_id = req.customer?.id;

    if (!customer_id) {
        return res.status(400).json({ message: 'Missing customer ID' });
    }

    if (!custom_product_id) {
        return res.status(400).json({ message: 'Product ID is required' });
    }

    try {
        await CartModel.deleteCustomProductFromCart({ customer_id, custom_product_id });
        res.status(200).json({ message: `Deleted custom product ${custom_product_id} from cart` });
    } catch (err) {
        console.error('error in cartController', err);
        res.status(500).json({ message: 'cartController error'});
    }
};

const finalizeCheckout = async (req, res) => {
    const { cart_id } = req.body;
    let usePoints = req.body.usePoints || false;
    const customer_id = req.customer?.id;
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
  getCartProducts,
  deleteProductFromCart,
  deleteCustomProductFromCart,
  finalizeCheckout
};

