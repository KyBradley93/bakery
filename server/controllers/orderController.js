const OrderModel = require('../models/orderModel');

const getProducts = async (req, res) => {
    try {
        const products = await OrderModel.getProducts();
        res.status(200).json(products);
    } catch (err) {
        console.error('error in orderController', err);
        res.status(500).json({ message: 'orderController error'});
    }
};

const getProductsByType = async (req, res) => {
    const { product_type_id } = req.body;
    try {
        const products = await OrderModel.getProductsByType({ product_type_id });
        res.status(200).json(products);
    } catch (err) {
        console.error('error in orderController', err);
        res.status(500).json({ message: 'orderController error'});
    }
};

const getProductTypes = async (req, res) => {
    try {
        const productTypes = await OrderModel.getProductTypes();
        res.status(200).json(productTypes);
    } catch (err) {
        console.error('error in orderController', err);
        res.status(500).json({ message: 'orderController error'});
    }
};

const getCustomProductSizes = async (req, res) => {
    try {
        const productSizes = await OrderModel.getCustomProductSizes();
        res.status(200).json(productSizes);
    } catch (err) {
        console.error('error in orderController', err);
        res.status(500).json({ message: 'orderController error'});
    }
};

const getCustomProductBases = async (req, res) => {
    try {
        const productBases = await OrderModel.getCustomProductBases();
        res.status(200).json(productBases);
    } catch (err) {
        console.error('error in orderController', err);
        res.status(500).json({ message: 'orderController error'});
    }
};

const getCustomProductVariants = async (req, res) => {
    try {
        const productVariants = await OrderModel.getCustomProductVariants();
        res.status(200).json(productVariants);
    } catch (err) {
        console.error('error in orderController', err);
        res.status(500).json({ message: 'orderController error'});
    }
};

const getCustomProductAddOns = async (req, res) => {
    try {
        const productAddOns = await OrderModel.getCustomProductAddOns();
        res.status(200).json(productAddOns);
    } catch (err) {
        console.error('error in orderController', err);
        res.status(500).json({ message: 'orderController error'});
    }
};

const getCustomProducts = async (req, res) => {
    try {
        const customProducts = await OrderModel.getCustomProducts();
        res.status(200).json(customProducts);
    } catch (err) {
        console.error('error in orderController', err);
        res.status(500).json({ message: 'orderController error'});
    }
};

const getCustomProductOrderAddOns = async (req, res) => {
    try {
        const customProductOrderAddOns = await OrderModel.getCustomProductOrderAddOns();
        res.status(200).json(customProductOrderAddOns);
    } catch (err) {
        console.error('error in orderController', err);
        res.status(500).json({ message: 'orderController error'});
    }
};

const addProductToCart = async (req, res) => {
    const { product_id, quantity } = req.body;
    const customer_id = req.customer?.id;

    if (!customer_id) {
        return res.status(400).json({ message: 'Missing customer ID' });
    }

    if (!product_id) {
        return res.status(400).json({ message: 'Product ID is required' });
    }

    try {
        await OrderModel.addProductToCart({ customer_id, product_id, quantity });
        res.status(200).json({ message: 'Added Item' });
    } catch (err) {
        console.error('error in orderController', err);
        res.status(500).json({ message: 'orderController error'});
    }
};

const addCustomProductToCart = async (req, res) => {
    const { product_type_id, custom_product_size_id, custom_product_base_id, custom_product_variant_id, custom_product_id, quantity } = req.body;

    const customer_id = req.customer?.id;

    if (!customer_id) {
        return res.status(400).json({ message: 'Missing customer ID' });
    }

    if (!custom_product_id) {
        return res.status(400).json({ message: 'Product ID is required' });
    }

    try {
        await OrderModel.addCustomProductToCart({ customer_id, product_type_id, custom_product_size_id, custom_product_base_id, custom_product_variant_id, custom_product_id, quantity });
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
