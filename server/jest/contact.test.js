const ContactController = require('../controllers/contactController');
const ContactModel = require('../models/contactModel');

jest.mock('../models/contactModel');

describe("Contact", () => {
  test("should do something", () => {
    expect(true).toBe(true); // temporary stub
  });
});


describe('getContacts', () => {
    it('gets all the contacts',  async () => {
        //arrange 
        const mockContacts = [
          { 
            id: '1', 
            name: 'John', 
            number: '777-777-7777',
            email: 'j.com'
          },
          { 
            id: '2', 
            name: 'Joe', 
            number: '111-111-1111',
            email: 'g.com'
          }
        ];


        // This is a mock of the res (response) object from Express. Leave alone?
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        ContactModel.getContacts.mockResolvedValue(mockContacts);

        //act
        await ContactController.getContacts({}, res);

        //assert
        // heres the function you're mocking from your model. It's what the controller calls to get the user from the database.
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockContacts);
    });

    it('should return 500 on error', async () => {
        ContactModel.getContacts.mockRejectedValue(new Error('DB error'));

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await ContactController.getContacts({}, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'contactController error' });
  });

});


describe('contactRequest', () => {
    it('creates a request to be contacted',  async () => {
        //arrange 
        const req = { 
          body: {
            name: 'bill', 
            number: '111-111-1111', 
            email: 'y.com', 
            message: 'call me'
          }
        }

        const message = 'call me'

        // This is a mock of the res (response) object from Express. Leave alone?
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        ContactModel.contactRequest.mockResolvedValue({});

        //act
        await ContactController.contactRequest(req, res);

        //assert
        // heres the function you're mocking from your model. It's what the controller calls to get the user from the database.
        expect(ContactModel.contactRequest).toHaveBeenCalledWith({ "name": 'bill', "number": '111-111-1111', "email": 'y.com', "message": 'call me' });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({message: `Made contact request: ${message}`});
    });

    it('should return 500 on error', async () => {
        ContactModel.contactRequest.mockRejectedValue(new Error('DB error'));

        const req = { 
          body: {
            name: 'bill', 
            number: '111-111-1111', 
            email: 'y.com', 
            message: 'call me'
          }
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await ContactController.contactRequest(req, res);

        expect(ContactModel.contactRequest).toHaveBeenCalledWith({ "name": 'bill', "number": '111-111-1111', "email": 'y.com', "message": 'call me' });
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'contactController error' });
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
