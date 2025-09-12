const OrderController = require('../controllers/orderController');
const OrderModel = require('../models/orderModel');

jest.mock('../models/orderModel');

describe("Order", () => {
  test("should do something", () => {
    expect(true).toBe(true); // temporary stub
  });
});

describe('getProducts', () => {
    it('gets all the products',  async () => {
        //arrange 
        const mockProducts = [
          { 
            id: '1', 
            name: 'pie', 
            cost: '2.99'
          },
          { 
            id: '2', 
            name: 'cake', 
            cost: '4.99'
          }
        ];


        // This is a mock of the res (response) object from Express. Leave alone?
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        OrderModel.getProducts.mockResolvedValue(mockProducts);

        //act
        await OrderController.getProducts({}, res);

        //assert
        // heres the function you're mocking from your model. It's what the controller calls to get the user from the database.
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockProducts);
    });

    it('should return 500 on error', async () => {
        OrderModel.getProducts.mockRejectedValue(new Error('DB error'));

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await OrderController.getProducts({}, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'orderController error' });
  });

});


describe('getProductsByType', () => {
    it('gets all the products by type',  async () => {
        //arrange 
        const mockProducts = [
          { 
            id: '3', 
            name: 'pie', 
            cost: '2.99',
            product_type_id: 4
          },
          { 
            id: '7', 
            name: 'pie', 
            cost: '4.99',
            product_type_id: 4
          }
        ];

        const req = {
          body: { product_type_id: 4 }
        }


        // This is a mock of the res (response) object from Express. Leave alone?
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        OrderModel.getProductsByType.mockResolvedValue(mockProducts);

        //act
        await OrderController.getProductsByType(req, res);

        //assert
        // heres the function you're mocking from your model. It's what the controller calls to get the user from the database.
        expect(OrderModel.getProductsByType).toHaveBeenCalledWith({ "product_type_id": 4 });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockProducts);
    });

    it('should return 500 on error', async () => {
        OrderModel.getProductsByType.mockRejectedValue(new Error('DB error'));

        const req = {
          body: { product_type_id: 4 }
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await OrderController.getProductsByType(req, res);

        expect(OrderModel.getProductsByType).toHaveBeenCalledWith({ "product_type_id": 4 });
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'orderController error' });
  });

});


describe('getProductTypes', () => {
    it('gets all the product types',  async () => {
        //arrange 
        const mockTypes = [
          { 
            id: '1', 
            type: 'pie'
          },
          { 
            id: '2', 
            type: 'cake'
          }
        ];


        // This is a mock of the res (response) object from Express. Leave alone?
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        OrderModel.getProductTypes.mockResolvedValue(mockTypes);

        //act
        await OrderController.getProductTypes({}, res);

        //assert
        // heres the function you're mocking from your model. It's what the controller calls to get the user from the database.
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockTypes);
    });

    it('should return 500 on error', async () => {
        OrderModel.getProductTypes.mockRejectedValue(new Error('DB error'));

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await OrderController.getProductTypes({}, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'orderController error' });
  });

});


describe('getCustomProductSizes', () => {
    it('gets all the product sizes',  async () => {
        //arrange 
        const mockSizes = [
          { 
            id: '1', 
            product_id: '2',
            size: 'whole'
          },
          { 
            id: '2', 
            product_id: '2',
            size: 'half'
          }
        ];


        // This is a mock of the res (response) object from Express. Leave alone?
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        OrderModel.getCustomProductSizes.mockResolvedValue(mockSizes);

        //act
        await OrderController.getCustomProductSizes({}, res);

        //assert
        // heres the function you're mocking from your model. It's what the controller calls to get the user from the database.
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockSizes);
    });

    it('should return 500 on error', async () => {
        OrderModel.getCustomProductSizes.mockRejectedValue(new Error('DB error'));

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await OrderController.getCustomProductSizes({}, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'orderController error' });
  });

});


describe('getCustomProductBases', () => {
    it('gets all the product bases',  async () => {
        //arrange 
        const mockBases = [
          { 
            id: '1', 
            product_id: '2',
            base: 'chocolate'
          },
          { 
            id: '2', 
            product_id: '2',
            base: 'vanilla'
          }
        ];


        // This is a mock of the res (response) object from Express. Leave alone?
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        OrderModel.getCustomProductBases.mockResolvedValue(mockBases);

        //act
        await OrderController.getCustomProductBases({}, res);

        //assert
        // heres the function you're mocking from your model. It's what the controller calls to get the user from the database.
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockBases);
    });

    it('should return 500 on error', async () => {
        OrderModel.getCustomProductBases.mockRejectedValue(new Error('DB error'));

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await OrderController.getCustomProductBases({}, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'orderController error' });
  });

});

describe('getCustomProductVariants', () => {
    it('gets all the product Variants',  async () => {
        //arrange 
        const mockVariants = [
          { 
            id: '1', 
            product_id: '2',
            variant: 'mint'
          },
          { 
            id: '2', 
            product_id: '2',
            variant: 'lavender'
          }
        ];


        // This is a mock of the res (response) object from Express. Leave alone?
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        OrderModel.getCustomProductVariants.mockResolvedValue(mockVariants);

        //act
        await OrderController.getCustomProductVariants({}, res);

        //assert
        // heres the function you're mocking from your model. It's what the controller calls to get the user from the database.
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockVariants);
    });

    it('should return 500 on error', async () => {
        OrderModel.getCustomProductVariants.mockRejectedValue(new Error('DB error'));

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await OrderController.getCustomProductVariants({}, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'orderController error' });
  });

});


describe('getCustomProductAddOns', () => {
    it('gets all the product Add Ons',  async () => {
        //arrange 
        const mockAddOns = [
          { 
            id: '1', 
            name: 'sprinkles'
          },
          { 
            id: '2', 
            name: 'hot sauce'
          }
        ];


        // This is a mock of the res (response) object from Express. Leave alone?
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        OrderModel.getCustomProductAddOns.mockResolvedValue(mockAddOns);

        //act
        await OrderController.getCustomProductAddOns({}, res);

        //assert
        // heres the function you're mocking from your model. It's what the controller calls to get the user from the database.
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockAddOns);
    });

    it('should return 500 on error', async () => {
        OrderModel.getCustomProductAddOns.mockRejectedValue(new Error('DB error'));

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await OrderController.getCustomProductAddOns({}, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'orderController error' });
  });

});


describe('getCustomProducts', () => {
    it('gets all the custom products',  async () => {
        //arrange 
        const mockCustomProducts = [
          { 
            id: '1', 
            product_id: '4', 
            size_id: '6'
          },
          { 
            id: '2', 
            product_id: '8', 
            size_id: '3'
          }
        ];


        // This is a mock of the res (response) object from Express. Leave alone?
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        OrderModel.getCustomProducts.mockResolvedValue(mockCustomProducts);

        //act
        await OrderController.getCustomProducts({}, res);

        //assert
        // heres the function you're mocking from your model. It's what the controller calls to get the user from the database.
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockCustomProducts);
    });

    it('should return 500 on error', async () => {
        OrderModel.getCustomProducts.mockRejectedValue(new Error('DB error'));

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await OrderController.getCustomProducts({}, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'orderController error' });
  });

});


describe('getCustomProductOrderAddOns', () => {
    it('gets all the custom product order add ons',  async () => {
        //arrange 
        const mockCustomProductOrderAddOns = [
          { 
            id: '1', 
            custom_product_id: '4', 
            add_on_id: '6'
          },
          { 
            id: '2', 
            custom_product_id: '8', 
            add_on_id: '3'
          }
        ];


        // This is a mock of the res (response) object from Express. Leave alone?
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        OrderModel.getCustomProductOrderAddOns.mockResolvedValue(mockCustomProductOrderAddOns);

        //act
        await OrderController.getCustomProductOrderAddOns({}, res);

        //assert
        // heres the function you're mocking from your model. It's what the controller calls to get the user from the database.
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockCustomProductOrderAddOns);
    });

    it('should return 500 on error', async () => {
        OrderModel.getCustomProductOrderAddOns.mockRejectedValue(new Error('DB error'));

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await OrderController.getCustomProductOrderAddOns({}, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'orderController error' });
  });

});


describe('addProductToCart', () => {
    it('add product to customer cart',  async () => {
        //arrange 
        const mockCartProduct = {
            cart_id: '1',
            product_id: '7'
        }

        const req = { 
            body: { product_id: 7, quantity: 1 },
            customer: { id: '123' }
        };

        // This is a mock of the res (response) object from Express. Leave alone?
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };


        OrderModel.addProductToCart.mockResolvedValueOnce(mockCartProduct)

        //act
        await OrderController.addProductToCart(req, res);

        //assert
        // heres the function you're mocking from your model. It's what the controller calls to get the user from the database.

        expect(OrderModel.addProductToCart).toHaveBeenCalledWith({ "customer_id": "123", "product_id": 7, "quantity": 1 });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Added Item' });
    });

    it('should return 500 on error', async () => {
        OrderModel.addProductToCart.mockRejectedValue(new Error('DB error'));

        const req = { 
            body: { product_id: 1 },
            customer: { id: '123' }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await OrderController.addProductToCart(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'orderController error' });
  });

});


describe('addCustomProductToCart', () => {
    it('add product to customer cart',  async () => {
        //arrange 
        const mockCustomProductForm = {
            product_type_id: '1',
            custom_product_size_id: '2',
            custom_product_base_id: '1', 
            custom_product_variant_id: '2',
            custom_product_id: '7',
            quantity: '1'
        }

        const req = { 
            body: { product_type_id: 1, custom_product_size_id: 2, custom_product_base_id: 1, custom_product_variant_id: 2, custom_product_id: 7, quantity: 1 },
            customer: { id: '123' }
        };

        // This is a mock of the res (response) object from Express. Leave alone?
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };


        OrderModel.addCustomProductToCart.mockResolvedValueOnce(mockCustomProductForm)

        //act
        await OrderController.addCustomProductToCart(req, res);

        //assert
        // heres the function you're mocking from your model. It's what the controller calls to get the user from the database.

        expect(OrderModel.addCustomProductToCart).toHaveBeenCalledWith({ "customer_id": "123", "product_type_id": 1, "custom_product_size_id": 2, "custom_product_base_id": 1, "custom_product_variant_id": 2, "custom_product_id": 7, "quantity": 1 });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Added Item' });
    });

    it('should return 500 on error', async () => {
        OrderModel.addCustomProductToCart.mockRejectedValue(new Error('DB error'));

        const req = { 
            body: { product_type_id: 1, custom_product_size_id: 2, custom_product_base_id: 1, custom_product_variant_id: 2, custom_product_id: 7, quantity: 1 },
            customer: { id: '123' }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await OrderController.addCustomProductToCart(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'orderController error' });
  });

});