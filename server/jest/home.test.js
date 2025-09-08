const HomeController = require('../controllers/homeController');
const HomeModel = require('../models/homeModel');

jest.mock('../models/homeModel');

describe("Home", () => {
  test("should do something", () => {
    expect(true).toBe(true); // temporary stub
  });
});



describe('getContest', () => {
    it('returns a random winner',  async () => {
        //arrange 
        const mockContest = [
          { 
            customer_id: '1', 
            product_id: '1',
            name: 'John', 
            base: 'chocolate'
          },
          { 
            customer_id: '2', 
            product_id: '2',
            name: 'Joe', 
            base: 'vanilla'
          }
        ];

        // This is a mock of the res (response) object from Express. Leave alone?
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Mock the full contest list
        HomeModel.getContest = jest.fn().mockResolvedValue(mockContest);

        //act
        await HomeController.getContestWinner({}, res);

        //assert

        // heres the function you're mocking from your model. It's what the controller calls to get the user from the database.
        expect(res.status).toHaveBeenCalledWith(200);

        // You can't predict the winner, but you can assert that it's one of the contestants
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
          customer_id: expect.any(String),
          product_id: expect.any(String),
          name: expect.any(String),
          base: expect.any(String)
        }));
    });

    it('should return 500 on error', async () => {
        HomeModel.getContest.mockRejectedValue(new Error('DB error'));

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await HomeController.getContestWinner({}, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'homeController error' });
  });

});


describe('getPhotos', () => {
    it('gets all the photos',  async () => {
        //arrange 
        const mockPhotos = [
          { 
            id: '1', 
            name: 'John', 
            src: 'j.jpg'
          },
          { 
            id: '2', 
            name: 'Joe', 
            src: 'p.jpg'
          }
        ];


        // This is a mock of the res (response) object from Express. Leave alone?
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        HomeModel.getPhotos.mockResolvedValue(mockPhotos);

        //act
        await HomeController.getPhotos({}, res);

        //assert
        // heres the function you're mocking from your model. It's what the controller calls to get the user from the database.
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockPhotos);
    });

    it('should return 500 on error', async () => {
        HomeModel.getPhotos.mockRejectedValue(new Error('DB error'));

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await HomeController.getPhotos({}, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'homeController error' });
  });

});


describe('getThreads', () => {
    it('gets all the threads',  async () => {
        //arrange 
        const mockThreads = [
          { 
            id: '1', 
            name: 'John', 
            content: 'poop'
          },
          { 
            id: '2', 
            name: 'Joe', 
            content: 'butt'
          }
        ];


        // This is a mock of the res (response) object from Express. Leave alone?
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        HomeModel.getThreads.mockResolvedValue(mockThreads);

        //act
        await HomeController.getThreads({}, res);

        //assert
        // heres the function you're mocking from your model. It's what the controller calls to get the user from the database.
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockThreads);
    });

    it('should return 500 on error', async () => {
        HomeModel.getThreads.mockRejectedValue(new Error('DB error'));

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await HomeController.getThreads({}, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'homeController error' });
  });

});