const ThreadModel = require('../models/threadModel');

const getThreads = async (req, res) => {
    try {
        const threads = await ThreadModel.getThreads();
        res.json(threads);
    } catch (err) {
        console.error('error in threadController', err);
        res.status(500).json({ message: 'threadController error'});
    }
};

const getThreadComments = async (req, res) => {
    const { thread_id } = req.body;

    try {
        const threadComments = await ThreadModel.getThreadComments({ thread_id });
        res.json({ threadComments });
    } catch (err) {
        console.error('error in threadController', err);
        res.status(500).json({ message: 'threadController error'});
    }
};

const postThreadComment = async (req, res) => {
    const { thread_id, customer_id, date, content } = req.body;

    try {
        const comment = await ThreadModel.postThreadComments({ thread_id, customer_id, date, content })
        res.status(200).json({ message: `Added Comment: ${comment}` });
    } catch (err) {
        console.error('error in threadController', err);
        res.status(500).json({ message: 'threadController error'});
    }
};

const addThread = async (req, res) => {
    const { customer_id, title, content, date } = req.body;

    try {
        const thread = await ThreadModel.addThread({ customer_id, title, content, date })
        res.json({ message: `Added Thread: ${thread}` });
    } catch (err) {
        console.error('error in threadController', err);
        res.status(500).json({ message: 'threadController error'});
    }
};

module.exports = {
  getThreads,
  getThreadComments,
  postThreadComment,
  addThread
};

/*
const = async (req, res) => {
    try {
        res.json();
    } catch (err) {
        console.error('error in threadController', err);
        res.status(500).json({ message: 'threadController error'});
    }
};
 */