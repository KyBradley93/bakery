jest.mock('../models/threadModel');
const ThreadController = require('../controllers/threadController');
const ThreadModel = require('../models/threadModel');


describe("Thread", () => {
  test("should do something", () => {
    expect(true).toBe(true); // temporary stub
  });
});


describe('getThreads', () => {
    it('gets all the threads',  async () => {
        //arrange 
        const mockThreads = [
          { 
            id: '1', 
            customer_id: '7', 
            title: 'hello',
            content: 'hi'
          },
          { 
            id: '2', 
            customer_id: '7', 
            title: 'hello hello',
            content: 'hi hi'
          }
        ];


        // This is a mock of the res (response) object from Express. Leave alone?
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        ThreadModel.getThreads.mockResolvedValue(mockThreads);

        //act
        await ThreadController.getThreads({}, res);

        //assert
        // heres the function you're mocking from your model. It's what the controller calls to get the user from the database.
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockThreads);
    });

    it('should return 500 on error', async () => {
        ThreadModel.getThreads.mockRejectedValue(new Error('DB error'));

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await ThreadController.getThreads({}, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'threadController error' });
  });

});


describe('getThreadComments', () => {
    it('gets all the thread comments',  async () => {
        //arrange 
        const mockThreadComments = [
          { 
            id: '1',
            thread_id: '11', 
            customer_id: '3', 
            content: 'hi'
          },
          { 
            id: '2',
            thread_id: '11', 
            customer_id: '7',
            content: 'hi hi'
          }
        ];

        const req = {
          body: { thread_id: 5 }
        }


        // This is a mock of the res (response) object from Express. Leave alone?
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        ThreadModel.getThreadComments.mockResolvedValue(mockThreadComments);

        //act
        await ThreadController.getThreadComments(req, res);

        //assert
        // heres the function you're mocking from your model. It's what the controller calls to get the user from the database.
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ threadComments: mockThreadComments });
    });

    it('should return 500 on error', async () => {
        ThreadModel.getThreadComments.mockRejectedValue(new Error('DB error'));

        const req = {
          body: { thread_id: 5 }
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await ThreadController.getThreadComments(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'threadController error' });
  });

});

describe('postThreadComment', () => {
    it('post a thread comment',  async () => {
        //arrange 
        const mockThreadComments = [
          { 
            thread_id: '11', 
            date: '11/1/25',
            customer_id: '3', 
            content: 'hi'
          },
          { 
            thread_id: '11', 
            date: '11/1/25',
            customer_id: '7',
            content: 'hi hi'
          }
        ];

        const req = { 
            customer: { id: '7' },
            body: { 
              thread_id: '11', 
              date: '11/1/25', 
              content: 'hi hi'
            }
        };

        // This is a mock of the res (response) object from Express. Leave alone?
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        ThreadModel.postThreadComment.mockResolvedValueOnce(mockThreadComments)

        //act
        await ThreadController.postThreadComment(req, res);

        //assert
        // heres the function you're mocking from your model. It's what the controller calls to get the user from the database.

        expect(ThreadModel.postThreadComment).toHaveBeenCalledWith({ "customer_id": "7", "thread_id": "11", "date": "11/1/25", "content": "hi hi" });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: `Added Comment` });
    });

    it('should return 500 on error', async () => {
        ThreadModel.postThreadComment.mockRejectedValue(new Error('DB error'));

       const req = { 
            customer: { id: '7' },
            body: { 
              thread_id: '11', 
              date: '11/1/25', 
              content: 'hi hi'
            }
        };


        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await ThreadController.postThreadComment(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'threadController error' });
  });

});


describe('addThread', () => {
    it('add a thread',  async () => {
        //arrange 
        const mockThread = [
          { 
            customer_id: '3', 
            title: 'hey',
            content: 'hi',
            date: '11/1/25'
          },
          { 
            customer_id: '4', 
            title: 'hey hey',
            content: 'hi hi',
            date: '11/2/25'
          }
        ];

        const req = { 
            customer: { id: '4' },
            body: { 
              title: 'hey hey',
              content: 'hi hi',
              date: '11/2/25'
            }
        };

        // This is a mock of the res (response) object from Express. Leave alone?
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        ThreadModel.addThread.mockResolvedValueOnce(mockThread)

        //act
        await ThreadController.addThread(req, res);

        //assert
        // heres the function you're mocking from your model. It's what the controller calls to get the user from the database.

        expect(ThreadModel.addThread).toHaveBeenCalledWith({ "customer_id": "4", "title": "hey hey", "content": "hi hi", "date": "11/2/25"});
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: `Added Thread` });
    });

    it('should return 500 on error', async () => {
      ThreadModel.addThread.mockRejectedValue(new Error('DB error'));


       const req = { 
            customer: { id: '4' },
            body: { 
              title: 'hey hey',
              content: 'hi hi',
              date: '11/2/25'
            }
        };


        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await ThreadController.addThread(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'threadController error' });
  });

});





