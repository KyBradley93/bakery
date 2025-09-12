const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cartController');
const AuthenticateCustomer = require('../middleware/auth')

router.get('/', AuthenticateCustomer, CartController.getCart);
router.delete('/delete', AuthenticateCustomer, CartController.deleteProductFromCart);
router.delete('/delete-custom', AuthenticateCustomer, CartController.deleteCustomProductFromCart);
router.post('/checkout', AuthenticateCustomer, CartController.finalizeCheckout);
router.get('/', AuthenticateCustomer, CartController.getCartProducts);

module.exports = router;