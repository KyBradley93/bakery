jest.mock('../models/postPaymentModel');

const mockConstructEvent = jest.fn();

jest.mock('stripe', () => {
  return jest.fn(() => ({
    webhooks: {
      constructEvent: mockConstructEvent
    }
  }));
});

const postPaymentModel = require('../models/postPaymentModel');
const { postPayment } = require('../controllers/postPaymentController');

// Define mocks for model functions
postPaymentModel.markCheckoutPaid = jest.fn();
postPaymentModel.getCartIdByCheckoutId = jest.fn();
postPaymentModel.deleteCartItemsByCartId = jest.fn();

describe('postPayment controller', () => {
  let req, res;

  beforeEach(() => {
    req = {
      headers: { 'stripe-signature': 'test-signature' },
      body: Buffer.from(JSON.stringify({})), // Stripe expects raw buffer
    };

    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    jest.clearAllMocks();
  });

  it('should return 400 if signature verification fails', async () => {
    mockConstructEvent.mockImplementation(() => {
      throw new Error('Invalid signature');
    });

    await postPayment(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(expect.stringContaining('Webhook Error'));
  });

  it('should update checkout and delete cart items on checkout.session.completed event', async () => {
    const checkoutId = '42';
    const cartId = 123;

    mockConstructEvent.mockReturnValue({
      type: 'checkout.session.completed',
      data: {
        object: {
          metadata: { checkout_id: checkoutId },
        },
      },
    });

    postPaymentModel.markCheckoutPaid.mockResolvedValue({});
    postPaymentModel.getCartIdByCheckoutId.mockResolvedValue(cartId);
    postPaymentModel.deleteCartItemsByCartId.mockResolvedValue({});

    await postPayment(req, res);

    expect(postPaymentModel.markCheckoutPaid).toHaveBeenCalledWith(checkoutId);
    expect(postPaymentModel.getCartIdByCheckoutId).toHaveBeenCalledWith(checkoutId);
    expect(postPaymentModel.deleteCartItemsByCartId).toHaveBeenCalledWith(cartId);
    expect(res.json).toHaveBeenCalledWith({ received: true });
  });

  it('should respond with { received: true } for other event types', async () => {
    mockConstructEvent.mockReturnValue({
      type: 'some.other.event',
      data: {},
    });

    await postPayment(req, res);

    expect(postPaymentModel.markCheckoutPaid).not.toHaveBeenCalled();
    expect(postPaymentModel.getCartIdByCheckoutId).not.toHaveBeenCalled();
    expect(postPaymentModel.deleteCartItemsByCartId).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({ received: true });
  });
});
