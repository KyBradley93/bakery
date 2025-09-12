jest.mock('stripe');
jest.mock('../models/cartModel', () => ({
  finalizeCheckout: jest.fn(),
}));

const Stripe = require('stripe');
const CartModel = require('../models/cartModel');
const paymentModel = require('../models/paymentModel');

// Create the mock function for sessions.create
//const mockCreateSession = jest.fn();

// Mock the constructor so that it returns your mocked Stripe instance
Stripe.mockImplementation(() => ({
  checkout: {
    sessions: {
      create: mockCreateSession
    }
  }
}));

// ✅ Manual mock of paymentModel methods
paymentModel.getLatestCartId = jest.fn();

// Import after mocking
const { handlePayment } = require('../controllers/paymentController');


const mockRequestResponse = () => {
  const req = {
    body: {
      items: [
        { id: 1, name: 'Table', quantity: 2, price: 5000 },
        { id: 2, name: 'Chair', quantity: 1, price: 3000 },
      ],
      total_price: 13000
    },
    customer: {
      id: 123
    }
  };

  const res = {
    json: jest.fn(),
    status: jest.fn().mockReturnThis()
  };

  return { req, res };
};

describe('handlePayment controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create checkout session and return Stripe URL', async () => {
    const { req, res } = mockRequestResponse();

    // Mock database calls
    paymentModel.getLatestCartId.mockResolvedValue(99);

    CartModel.finalizeCheckout.mockResolvedValue({
      checkout_id: 1001,
      stripe_url: 'https://stripe.com/fake-session-url',
    });

    await handlePayment(req, res);

    //paymentModel.createCheckout.mockResolvedValue(1001);
    //paymentModel.addCheckoutItem.mockResolvedValue();

    // Mock Stripe session creation
    mockCreateSession.mockResolvedValue({
      url: 'https://stripe.com/fake-session-url'
    });

    await handlePayment(req, res);

    expect(paymentModel.getLatestCartId).toHaveBeenCalledWith(123);
    expect(CartModel.finalizeCheckout).toHaveBeenCalledWith(99, 123, false);


    expect(res.json).toHaveBeenCalledWith({
      url: 'https://stripe.com/fake-session-url'
    });
  });

  it('should return 500 if error occurs', async () => {
    const { req, res } = mockRequestResponse();

    paymentModel.getLatestCartId.mockRejectedValue(new Error('DB error'));

    await handlePayment(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Failed to create checkout session'
    });
  });
});
