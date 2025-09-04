const OrderModel = require('../models/orderModel');

const getProducts = async (req, res) => {
    try {
        const products = await OrderModel.getProducts();
        res.json(products);
    } catch (err) {
        console.error('error in orderController', err);
        res.status(500).json({ message: 'orderController error'});
    }
};

const getProductsByType = async (req, res) => {
    const { product_type_id } = req.body;
    try {
        const product = await OrderModel.getProductByType({ product_type_id });
        res.json(product);
    } catch (err) {
        console.error('error in orderController', err);
        res.status(500).json({ message: 'orderController error'});
    }
};

const getProductTypes = async (req, res) => {
    try {
        const productTypes = await OrderModel.getProductTypes();
        res.json(productTypes);
    } catch (err) {
        console.error('error in orderController', err);
        res.status(500).json({ message: 'orderController error'});
    }
};

const getCustomProductSizes = async (req, res) => {
    try {
        const productSizes = await OrderModel.getCustomProductSizes();
        res.json(productSizes);
    } catch (err) {
        console.error('error in orderController', err);
        res.status(500).json({ message: 'orderController error'});
    }
};

const getCustomProductBases = async (req, res) => {
    try {
        const productBases = await OrderModel.getCustomProductBases();
        res.json(productBases);
    } catch (err) {
        console.error('error in orderController', err);
        res.status(500).json({ message: 'orderController error'});
    }
};

const getCustomProductVariants = async (req, res) => {
    try {
        const productVariants = await OrderModel.getCustomProductVariants();
        res.json(productVariants);
    } catch (err) {
        console.error('error in orderController', err);
        res.status(500).json({ message: 'orderController error'});
    }
};

const getCustomProductAddOns = async (req, res) => {
    try {
        const productAddOns = await OrderModel.getCustomProductAddOns();
        res.json(productAddOns);
    } catch (err) {
        console.error('error in orderController', err);
        res.status(500).json({ message: 'orderController error'});
    }
};

const getCustomProducts = async (req, res) => {
    try {
        const customProducts = await OrderModel.getCustomProducts();
        res.json(customProducts);
    } catch (err) {
        console.error('error in orderController', err);
        res.status(500).json({ message: 'orderController error'});
    }
};

const getCustomProductOrderAddOns = async (req, res) => {
    try {
        const customProductOrderAddOns = await OrderModel.getCustomProductOrderAddOns();
        res.json(customProductOrderAddOns);
    } catch (err) {
        console.error('error in orderController', err);
        res.status(500).json({ message: 'orderController error'});
    }
};

const addProductToCart = async (req, res) => {
    const { customer_id, product_id, quantity } = req.body;

    try {
        await OrderModel.addProductToCart({ customer_id, product_id, quantity });
        res.status(200).json({ message: 'Added Item' });
    } catch (err) {
        console.error('error in orderController', err);
        res.status(500).json({ message: 'orderController error'});
    }
};

const addCustomProductToCart = async (req, res) => {
    const { customer_id, custom_product_id, quantity } = req.body;

    try {
        await OrderModel.addCustomProductToCart({ customer_id, custom_product_id, quantity });
        res.status(200).json({ message: 'Added Item' });
    } catch (err) {
        console.error('error in orderController', err);
        res.status(500).json({ message: 'orderController error'});
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
