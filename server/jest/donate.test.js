const DonateController = require('../controllers/donateController');
const DonateModel = require('../models/donateModel');

jest.mock('../models/donateModel');

describe("Donate", () => {
  test("should do something", () => {
    expect(true).toBe(true); // temporary stub
  });
});


describe('sponsorRequest', () => {
    it('creates a request to be contacted',  async () => {
        //arrange 
        const req = { 
          body: {
            name: 'bill', 
            number: '111-111-1111', 
            email: 'y.com', 
            business: 'job'
          }
        }

        const business = 'job';

        // This is a mock of the res (response) object from Express. Leave alone?
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        DonateModel.sponsorRequest.mockResolvedValue({});

        //act
        await DonateController.sponsorRequest(req, res);

        //assert
        // heres the function you're mocking from your model. It's what the controller calls to get the user from the database.
        expect(DonateModel.sponsorRequest).toHaveBeenCalledWith({ "name": 'bill', "number": '111-111-1111', "email": 'y.com', "business": 'job' });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: `Made sponsor request for: ${business}` });
    });

    it('should return 500 on error', async () => {
        DonateModel.sponsorRequest.mockRejectedValue(new Error('DB error'));

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

        await DonateController.sponsorRequest(req, res);

        expect(DonateModel.sponsorRequest).toHaveBeenCalledWith({ "name": 'bill', "number": '111-111-1111', "email": 'y.com', "business": 'job' });
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'donateController error' });
  });

});


describe('volunteerRequest', () => {
    it('creates a request to be contacted',  async () => {
        //arrange 
        const req = { 
          body: {
            name: 'bill', 
            number: '111-111-1111',
            email: 'y.com'
          }
        }

        const name = 'bill';

        // This is a mock of the res (response) object from Express. Leave alone?
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        DonateModel.volunteerRequest.mockResolvedValue({});

        //act
        await DonateController.volunteerRequest(req, res);

        //assert
        // heres the function you're mocking from your model. It's what the controller calls to get the user from the database.
        expect(DonateModel.volunteerRequest).toHaveBeenCalledWith({ "name": 'bill', "number": '111-111-1111', "email": 'y.com' });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: `Made volunteer request for: ${ name }` });
    });

    it('should return 500 on error', async () => {
        DonateModel.volunteerRequest.mockRejectedValue(new Error('DB error'));

        const req = { 
          body: {
            name: 'bill', 
            number: '111-111-1111', 
            email: 'y.com'
          }
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await DonateController.volunteerRequest(req, res);

        expect(DonateModel.volunteerRequest).toHaveBeenCalledWith({ "name": 'bill', "number": '111-111-1111', "email": 'y.com' });
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'donateController error' });
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
            email: 'j.com',
            business: 'store' 
          },
          { 
            id: '2', 
            name: 'Joe', 
            number: '111-111-1111',
            email: 'g.com',
            business: 'job' 
          }
        ];


        // This is a mock of the res (response) object from Express. Leave alone?
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        DonateModel.getSponsors.mockResolvedValue(mockContacts);

        //act
        await DonateController.getSponsors({}, res);

        //assert
        // heres the function you're mocking from your model. It's what the controller calls to get the user from the database.
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockContacts);
    });

    it('should return 500 on error', async () => {
        DonateModel.getSponsors.mockRejectedValue(new Error('DB error'));

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await DonateController.getSponsors({}, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'donateController error' });
  });

});


describe('getSponsors', () => {
    it('gets all the sponsors',  async () => {
        //arrange 
        const mockSponsors = [
          { 
            id: '1', 
            name: 'John', 
            number: '777-777-7777',
            email: 'j.com',
            business: 'store' 
          },
          { 
            id: '2', 
            name: 'Joe', 
            number: '111-111-1111',
            email: 'g.com',
            business: 'job' 
          }
        ];


        // This is a mock of the res (response) object from Express. Leave alone?
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        DonateModel.getSponsors.mockResolvedValue(mockSponsors);

        //act
        await DonateController.getSponsors({}, res);

        //assert
        // heres the function you're mocking from your model. It's what the controller calls to get the user from the database.
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockSponsors);
    });

    it('should return 500 on error', async () => {
        DonateModel.getSponsors.mockRejectedValue(new Error('DB error'));

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await DonateController.getSponsors({}, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'donateController error' });
  });

});

/*
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

        const message = 'call me';

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
*/
