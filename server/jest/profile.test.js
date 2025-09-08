const ProfileController = require('../controllers/profileController');
const ProfileModel = require('../models/profileModel');

jest.mock('../models/profileModel');

describe("Profile", () => {
  test("should do something", () => {
    expect(true).toBe(true); // temporary stub
  });
});


describe('getEvents', () => {
    it('gets all the events',  async () => {
        //arrange 
        const mockEvents = [
          { 
            id: '1', 
            name: 'Johns Party', 
            date: '11/1/25',
            time: '11:00'
          },
          { 
            id: '2', 
            name: 'Johns Funeral', 
            date: '11/2/25',
            time: '11:00'
          }
        ];


        // This is a mock of the res (response) object from Express. Leave alone?
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        ProfileModel.getEvents.mockResolvedValue(mockEvents);

        //act
        await ProfileController.getEvents({}, res);

        //assert
        // heres the function you're mocking from your model. It's what the controller calls to get the user from the database.
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockEvents);
    });

    it('should return 500 on error', async () => {
        ProfileModel.getEvents.mockRejectedValue(new Error('DB error'));

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await ProfileController.getEvents({}, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'profileController error' });
  });

});



describe('getProfileRewards', () => {
    it('gets profile rewards',  async () => {
        //arrange 
        const mockRewards = [
          { 
            id: '1', 
            customer_id : '123',
            reward: 'money'
          },
          { 
            id: '2', 
            customer_id : '123',
            reward: 'drugs'
          }
        ];

        const req = { 
            customer: { id: '123' } 
        };

        // This is a mock of the res (response) object from Express. Leave alone?
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        ProfileModel.getProfileRewards.mockResolvedValue(mockRewards);

        //act
        await ProfileController.getProfileRewards(req, res);

        //assert
        // heres the function you're mocking from your model. It's what the controller calls to get the user from the database.

        expect(ProfileModel.getProfileRewards).toHaveBeenCalledWith({ "customer_id": "123" });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockRewards);
    });

    it('should return 500 on error', async () => {
        ProfileModel.getProfileRewards.mockRejectedValue(new Error('DB error'));

        const req = { 
            customer: { id: '123' } 
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await ProfileController.getProfileRewards(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'profileController error' });
  });

});



describe('getProfileEvents', () => {
    it('gets profile events',  async () => {
        //arrange 
        const mockEvents = [
          { 
            customer_id: '123', 
            name : 'Johns Party',
            date: '1/1/25'
          },
          { 
            customer_id: '123', 
            name : 'James Party',
            date: '1/2/25'
          }
        ];

        const req = { 
            customer: { id: '123' } 
        };

        // This is a mock of the res (response) object from Express. Leave alone?
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        ProfileModel.getProfileEvents.mockResolvedValue(mockEvents);

        //act
        await ProfileController.getProfileEvents(req, res);

        //assert
        // heres the function you're mocking from your model. It's what the controller calls to get the user from the database.

        expect(ProfileModel.getProfileEvents).toHaveBeenCalledWith({ "customer_id": "123" });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockEvents);
    });

    it('should return 500 on error', async () => {
        ProfileModel.getProfileEvents.mockRejectedValue(new Error('DB error'));

        const req = { 
            customer: { id: '123' } 
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await ProfileController.getProfileEvents(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'profileController error' });
  });

});



describe('getProfilePoints', () => {
    it('gets profile events',  async () => {
        //arrange 
        const mockPoints = [
          { 
            customer_id: '123', 
            points : 500
          }
        ];

        const req = { 
            customer: { id: '123' } 
        };

        // This is a mock of the res (response) object from Express. Leave alone?
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        ProfileModel.getProfilePoints.mockResolvedValue(mockPoints);

        //act
        await ProfileController.getProfilePoints(req, res);

        //assert
        // heres the function you're mocking from your model. It's what the controller calls to get the user from the database.

        expect(ProfileModel.getProfilePoints).toHaveBeenCalledWith({ "customer_id": "123" });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockPoints);
    });

    it('should return 500 on error', async () => {
        ProfileModel.getProfilePoints.mockRejectedValue(new Error('DB error'));

        const req = { 
            customer: { id: '123' } 
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await ProfileController.getProfilePoints(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'profileController error' });
  });

});


describe('useReward', () => {
    it('use a profile reward',  async () => {
        //arrange 
        const mockReward = {
            customer_id: '123',
            reward: 'money'
        }

        const req = { 
            body: { reward: 'money' },
            customer: { id: '123' }
        };

        // This is a mock of the res (response) object from Express. Leave alone?
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const reward = 'money';


        ProfileModel.useReward.mockResolvedValueOnce(mockReward)

        //act
        await ProfileController.useReward(req, res);

        //assert
        // heres the function you're mocking from your model. It's what the controller calls to get the user from the database.

        expect(ProfileModel.useReward).toHaveBeenCalledWith({ "reward": "money", "customer_id": "123" });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: `Used Reward: ${reward}`});
    });

    it('should return 500 on error', async () => {
        ProfileModel.useReward.mockRejectedValue(new Error('DB error'));

        const req = { 
            body: { reward: 'money' },
            customer: { id: '123' }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await ProfileController.useReward(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'profileController error' });
  });

});


describe('postContest', () => {
    it('post a contest submission',  async () => {
        //arrange 
        const mockContestForm = {
            customer_id: '123',
            name: 'yummuy',
            base: 'chocolate'
        }

        const req = { 
            customer: { id: '123' },
            body: { 
              product_type_id: '1',
              name: 'Cookie Pie',
              base: 'chocolate',
              variant: 'rum',
              add_ons: 'money',
              story: 'yes' 
            }
        };

        // This is a mock of the res (response) object from Express. Leave alone?
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const name = 'Cookie Pie';


        ProfileModel.postContest.mockResolvedValueOnce(mockContestForm)

        //act
        await ProfileController.postContest(req, res);

        //assert
        // heres the function you're mocking from your model. It's what the controller calls to get the user from the database.

        expect(ProfileModel.postContest).toHaveBeenCalledWith({ "customer_id": "123", "product_type_id": "1", "name": "Cookie Pie", "base": "chocolate", "variant": "rum", "add_ons": "money", "story": "yes" });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: `Posted Recipe For Contest: ${name}`});
    });

    it('should return 500 on error', async () => {
        ProfileModel.postContest.mockRejectedValue(new Error('DB error'));

       const req = { 
            customer: { id: '123' },
            body: { 
              product_type_id: '1',
              name: 'Cookie Pie',
              base: 'chocolate',
              variant: 'rum',
              add_ons: 'money',
              story: 'yes' 
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await ProfileController.useReward(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'profileController error' });
  });

});


describe('rsvp', () => {
    it('rsvp',  async () => {
        //arrange 
        const mockEventAttendees = {
            event_id: '3',
            customer_id: '123'
        }

        const req = { 
            body: { event_id: '3' },
            customer: { id: '123' }
        };

        // This is a mock of the res (response) object from Express. Leave alone?
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };


        ProfileModel.useReward.mockResolvedValueOnce(mockEventAttendees)

        //act
        await ProfileController.rsvp(req, res);

        //assert
        // heres the function you're mocking from your model. It's what the controller calls to get the user from the database.

        expect(ProfileModel.rsvp).toHaveBeenCalledWith({ "event_id": "3", "customer_id": "123" });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: `Reserved a space for you!`});
    });

    it('should return 500 on error', async () => {
        ProfileModel.rsvp.mockRejectedValue(new Error('DB error'));

        const req = { 
            body: { event_id: '3' },
            customer: { id: '123' }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await ProfileController.rsvp(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'profileController error' });
  });

});


describe('addReward', () => {
    it('adds reward to profile',  async () => {
        //arrange 
        const mockProfileRewards = {
            customer_id: '123',
            reward: "money"
        }

        const req = { 
            customer: { id: '123' },
            body: { reward: 'money' }
        };

        // This is a mock of the res (response) object from Express. Leave alone?
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };


        ProfileModel.addReward.mockResolvedValueOnce(mockProfileRewards)

        //act
        await ProfileController.addReward(req, res);

        //assert
        // heres the function you're mocking from your model. It's what the controller calls to get the user from the database.

        expect(ProfileModel.addReward).toHaveBeenCalledWith({ "customer_id": "123", "reward": "money" });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: `Added Reward` });
    });

    it('should return 500 on error', async () => {
        ProfileModel.addReward.mockRejectedValue(new Error('DB error'));

        const req = { 
            customer: { id: '123' },
            body: { reward: 'money' }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await ProfileController.rsvp(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'profileController error' });
  });

});