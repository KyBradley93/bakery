const AuthController = require('../controllers/authController');
const AuthModel = require('../models/authModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

jest.mock('google-auth-library');
jest.mock('../models/authModel');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');


describe('login', () => {
    it('should login with a token',  async () => {
        //arrange 
        const mockUser = { 
            id: '123', 
            name: 'John', 
            password: 'hashed_password' 
        };

        const req = { 
            body: { name: 'John', password: 'test' } 
        };

        // This is a mock of the res (response) object from Express. Leave alone?
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        AuthModel.getCustomer.mockResolvedValue({ rows: [mockUser] });
        bcrypt.compare.mockResolvedValue(true); // password is valid
        jwt.sign.mockReturnValue('mock-jwt-token');

        //act
        await AuthController.login(req, res);

        //assert
        // heres the function you're mocking from your model. It's what the controller calls to get the user from the database.

        expect(AuthModel.getCustomer).toHaveBeenCalledWith({ name: 'John', password: 'test' });
        expect(bcrypt.compare).toHaveBeenCalledWith('test', 'hashed_password');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Login successful',
            token: 'mock-jwt-token'
        });
    });

    it('should return 500 on error', async () => {
        AuthModel.getCustomer.mockRejectedValue(new Error('DB error'));

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

});


describe('register', () => {
    it('should register with name and password',  async () => {
        //arrange 
        const req = { 
            body: { name: 'John', password: 'test' } 
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const hashedPassword = 'mocked_hashed_password';

        // fake responses. what the expect is expecting?
        bcrypt.hash.mockResolvedValue(hashedPassword);
        AuthModel.getCustomerName.mockResolvedValue({ rows: [] });
        AuthModel.register.mockResolvedValue({ rows: [{ id: 1, name: 'John' }] });

        //act
        await AuthController.register(req, res);

        //assert
        // heres the function you're mocking from your model. It's what the controller calls to get the user from the database.

        expect(bcrypt.hash).toHaveBeenCalledWith('test', 10);
        expect(AuthModel.register).toHaveBeenCalledWith('John', 'mocked_hashed_password');
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Registered successfully'
        });
    });

    it('should return 500 on error', async () => {
        bcrypt.hash.mockResolvedValue('mocked_hashed_password');
        AuthModel.register.mockRejectedValue(new Error('DB error'));

        const req = { 
            body: { name: 'John', password: 'test' } 
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await AuthController.register(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'authController error' });
  });

});


describe('google-login', () => {
    const mockRes = {
            //mocking Express’s res object
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

    const mockReq = {
        body: {
            //It simulates receiving a token from a frontend Google OAuth login.
            token: 'mock-google-id-token'
        }
    };

    const mockPayload = {
        //This simulates what Google returns when the token is verified
        sub: 'google-user-123',
        email: 'john@example.com',
        name: 'John Doe'
    };

    const mockUserRow = {
        //this simulates a user row from your database (customers)
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        google_id: 'google-user-123'
    };

    //ensures that mocks (like res.json) don’t keep history between tests.
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should register a new Google user and return JWT',  async () => {
        //simulates a ticket object returned by client.verifyIdToken(...).
        const mockTicket = {
            getPayload: jest.fn().mockReturnValue(mockPayload)
        };
        //simulates the verifyIdToken() method returning the ticket
        const mockClient = {
            verifyIdToken: jest.fn().mockResolvedValue(mockTicket)
        };

        // Replace the global `client` with mock
        OAuth2Client.mockImplementation(() => mockClient);

        // Simulate user doesn't exist initially
        AuthModel.getCustomerByGoogleId
            .mockResolvedValueOnce({ rows: [] }) // first lookup = not found
            .mockResolvedValueOnce({ rows: [mockUserRow] }); // second lookup = user now exists

        //simulates successful DB insert.
        AuthModel.googleRegister.mockResolvedValue({});

        //mocks JWT creation
        jwt.sign.mockReturnValue('mock-jwt-token');

        // Call controller
        const client = new OAuth2Client(); // get our mocked client
        //pass req, res, and mocked client into the controller.
        await AuthController.googleLogin(mockReq, mockRes, client);


        //assert
        // heres the function you're mocking from your model. It's what the controller calls to get the user from the database.

        //confirms token verification was called with the right data.
        expect(mockClient.verifyIdToken).toHaveBeenCalledWith({
            idToken: 'mock-google-id-token',
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        //confirms the app checked for the user in DB.
        expect(AuthModel.getCustomerByGoogleId).toHaveBeenCalledWith('google-user-123');

        //confirms registration occurred with correct values.
        expect(AuthModel.googleRegister).toHaveBeenCalledWith({
            name: 'John Doe',
            email: 'john@example.com',
            googleId: 'google-user-123'
        });

        //confirms JWT was generated with expected payload.
        expect(jwt.sign).toHaveBeenCalledWith(
            { id: '1', name: 'John Doe' },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        //confirms that a success response was sent to the client.
        expect(mockRes.json).toHaveBeenCalledWith({
            message: 'Google login successful',
            token: 'mock-jwt-token'
        });
        
    });

    it('should return 500 on error', async () => {
        //simulates a failure in token verification (e.g. bad or expired token).
        const mockClient = {
            verifyIdToken: jest.fn().mockRejectedValue(new Error('Google error'))
        };
        OAuth2Client.mockImplementation(() => mockClient);

        //calls controller with the broken client.
        const client = new OAuth2Client();
        await AuthController.googleLogin(mockReq, mockRes, client);

        //confirms that the controller returned a 500 error.
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'authController error' });
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