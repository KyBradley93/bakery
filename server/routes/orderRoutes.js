const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');

router.get('/products', OrderController.getProducts);
router.get('/products-by-type', OrderController.getProductsByType);
router.get('/product-types', OrderController.getProductTypes);
router.get('/custom-product-sizes', OrderController.getCustomProductSizes);
router.get('/custom-product-bases', OrderController.getCustomProductBases);
router.get('/custom-product-variants', OrderController.getCustomProductVariants);
router.get('/custom-product-add-ons', OrderController.getCustomProductAddOns);
router.get('/custom-products', OrderController.getCustomProducts);
router.get('/custom-product-order-add-on', OrderController.getCustomProductOrderAddOns);
router.post('/product', OrderController.addProductToCart);
router.post('/custom-product', OrderController.addCustomProductToCart);

module.exports = router;
