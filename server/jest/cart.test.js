const CartController = require('../controllers/cartController');
const CartModel = require('../models/cartModel');

jest.mock('../models/cartModel');

describe("Cart", () => {
  test("should do something", () => {
    expect(true).toBe(true); // temporary stub
  });
});

describe('getCart', () => {
    it('should find customer cart with customer_id',  async () => {
        //arrange 
        const mockCart = { 
            id: '1', 
            customer_id : '123',
            total_price: '22.22',
            created_at: '11/11/25'
        };

        const req = { 
            customer: { id: '123' } 
        };

        // This is a mock of the res (response) object from Express. Leave alone?
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        CartModel.getCart.mockResolvedValue([mockCart]);

        //act
        await CartController.getCart(req, res);

        //assert
        // heres the function you're mocking from your model. It's what the controller calls to get the user from the database.

        expect(CartModel.getCart).toHaveBeenCalledWith('123');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([mockCart]);
    });

    it('should return 500 on error', async () => {
        CartModel.getCart.mockRejectedValue(new Error('DB error'));

        const req = { 
            customer: { id: '123' } 
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await CartController.getCart(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'cartController error' });
  });

});


describe('getCartProducts', () => {
    it('should find customer cart products with customer_id',  async () => {
        //arrange 
        const mockCartProducts = { 
            id: '1', 
            cart_id : '123',
            product_id: '22.22',
            custom_product_id: null,
            unit_price: '11/11/25',
            quantity: '1'
        };

        const req = { 
            customer: { id: '123' } 
        };

        // This is a mock of the res (response) object from Express. Leave alone?
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        CartModel.getCartProducts.mockResolvedValue([mockCartProducts]);

        //act
        await CartController.getCartProducts(req, res);

        //assert
        // heres the function you're mocking from your model. It's what the controller calls to get the user from the database.

        expect(CartModel.getCartProducts).toHaveBeenCalledWith('123');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([mockCartProducts]);
    });

    it('should return 500 on error', async () => {
        CartModel.getCartProducts.mockRejectedValue(new Error('DB error'));

        const req = { 
            customer: { id: '123' } 
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await CartController.getCartProducts(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'cartController error' });
  });

});


describe('deleteProductFromCart', () => {
    it('delete product from customer cart',  async () => {
        //arrange 
        const mockCartProduct = {
            cart_id: '1',
            product_id: '7'
        }

        const req = { 
            body: { product_id: 7 },
            customer: { id: '123' }
        };

        // This is a mock of the res (response) object from Express. Leave alone?
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };


        CartModel.deleteProductFromCart.mockResolvedValueOnce(mockCartProduct)

        //act
        await CartController.deleteProductFromCart(req, res);

        //assert
        // heres the function you're mocking from your model. It's what the controller calls to get the user from the database.

        expect(CartModel.deleteProductFromCart).toHaveBeenCalledWith({"customer_id": "123", "product_id": 7});
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Deleted product 7 from cart' });
    });

    it('should return 500 on error', async () => {
        CartModel.deleteProductFromCart.mockRejectedValue(new Error('DB error'));

        const req = { 
            body: { product_id: 1 },
            customer: { id: '123' }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await CartController.deleteProductFromCart(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'cartController error' });
  });

});


describe('deleteCustomProductFromCart', () => {
    it('delete custom product from customer cart',  async () => {
        //arrange 
        const mockCartProduct = {
            cart_id: '1',
            custom_product_id: '4'
        }

        const req = { 
            body: { custom_product_id: 4 },
            customer: { id: '123' }
        };

        // This is a mock of the res (response) object from Express. Leave alone?
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        CartModel.deleteCustomProductFromCart.mockResolvedValueOnce(mockCartProduct)

        //act
        await CartController.deleteCustomProductFromCart(req, res);

        //assert
        // heres the function you're mocking from your model. It's what the controller calls to get the user from the database.

        expect(CartModel.deleteCustomProductFromCart).toHaveBeenCalledWith({"customer_id": "123", "custom_product_id": 4});
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Deleted custom product 4 from cart' });
    });

    it('should return 500 on error', async () => {
        CartModel.deleteCustomProductFromCart.mockRejectedValue(new Error('DB error'));

        const req = { 
            body: { custom_product_id: 1 },
            customer: { id: '123' }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await CartController.deleteCustomProductFromCart(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'cartController error' });
  });

});


describe('finalizeCheckout', () => {
    it('moves cart products to checkout',  async () => {
        //arrange 
        const mockCheckout = {
            cart_id: '1',
            customer_id: '4',
            usePoints: false
        }

        const req = { 
            body: { cart_id: 1, usePoints: false },
            customer: { id: '4' }
        };

        // This is a mock of the res (response) object from Express. Leave alone?
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        CartModel.finalizeCheckout.mockResolvedValueOnce(mockCheckout);

        //act
        await CartController.finalizeCheckout(req, res);

        //assert
        // heres the function you're mocking from your model. It's what the controller calls to get the user from the database.

        expect(CartModel.finalizeCheckout).toHaveBeenCalledWith({ "cart_id": 1, "customer_id": "4" });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Checkout Completed'});
    });

    it('should return 500 on error', async () => {
        CartModel.finalizeCheckout.mockRejectedValue(new Error('DB error'));

        const req = { 
            body: { cart_id: 1, usePoints: false },
            customer: { id: '4' }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await CartController.finalizeCheckout(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'cartController error' });
  });

})

/*
describe('login', () => {
    it('should login with a token',  async () => {
        //arrange 
        const mockUser = { 
            _id: '123', 
            name: 'John', 
            password: 'test' 
        };

        const req = { 
            body: { name: 'John', password: 'test' } 
        };

        // This is a mock of the res (response) object from Express. Leave alone?
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        AuthModel.login.mockResolvedValue(mockUser);
        bcrypt.compare.mockResolvedValue(true); // password is valid
        jwt.sign.mockReturnValue('mock-jwt-token');

        //act
        await AuthController.login(req, res);

        //assert
        // heres the function you're mocking from your model. It's what the controller calls to get the user from the database.

        expect(AuthModel.login).toHaveBeenCalledWith({ name: 'John', password: 'test' });
        expect(bcrypt.compare).toHaveBeenCalledWith('test', 'hashed_password');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Login successful',
            token: 'mock-jwt-token'
        });
    });

    it('should return 500 on error', async () => {
        AuthModel.login.mockRejectedValue(new Error('DB error'));

        const req = { 
            body: { name: 'John', password: 'test' } 
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await AuthController.login(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'authController error' });
  });

})
*/