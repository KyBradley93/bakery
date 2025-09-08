const ThreadModel = require('../models/threadModel');

const getThreads = async (req, res) => {
    try {
        const threads = await ThreadModel.getThreads();
        res.status(200).json(threads);
    } catch (err) {
        console.error('error in threadController', err);
        res.status(500).json({ message: 'threadController error'});
    }
};

const getThreadComments = async (req, res) => {
    const { thread_id } = req.body;

    try {
        const threadComments = await ThreadModel.getThreadComments({ thread_id });
        res.status(200).json({ threadComments });
    } catch (err) {
        console.error('error in threadController', err);
        res.status(500).json({ message: 'threadController error'});
    }
};

const postThreadComment = async (req, res) => {
    const { thread_id, date, content } = req.body;

    const customer_id = req.customer?.id;

    if (!customer_id) {
        return res.status(400).json({ message: 'Missing customer ID' });
    };

    try {
        await ThreadModel.postThreadComment({ thread_id, customer_id, date, content })
        res.status(200).json({ message: `Added Comment` });
    } catch (err) {
        console.error('error in threadController', err);
        res.status(500).json({ message: 'threadController error'});
    }
};

const addThread = async (req, res) => {
    const { title, content, date } = req.body;

    const customer_id = req.customer?.id;

    if (!customer_id) {
        return res.status(400).json({ message: 'Missing customer ID' });
    };

    try {
        await ThreadModel.addThread({ customer_id, title, content, date })
        res.status(200).json({ message: `Added Thread` });
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