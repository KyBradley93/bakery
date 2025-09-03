const ProfileModel = require('../models/profileModel');

const getEvents = async (req, res) => {
    try {
        const events = await ProfileModel.getEvents();
        res.json(events);
    } catch (err) {
        console.error('error in profileController', err);
        res.status(500).json({ message: 'profileController error'});
    };
};

const getProfileRewards = async (req, res) => {
    const { customer_id } = req.body;

    try {
        const rewards = ProfileModel.getProfileRewards({ customer_id });
        res.json(rewards);
    } catch (err) {
        console.error('error in profileController', err);
        res.status(500).json({ message: 'profileController error'});
    };
};

const getCustomersEvents = async (req, res) => {
    const { customer_id } = req.body;

    try {
        const events = ProfileModel.getCustomersEvents({ customer_id });
        res.json(events);
    } catch (err) {
        console.error('error in profileController', err);
        res.status(500).json({ message: 'profileController error'});
    }
};

const getProfilePoints = async (req, res) => {
    const { customer_id } = req.body;

    try {
        const points = ProfileModel.getProfilePoints({ customer_id });
        res.json(points);
    } catch (err) {
        console.error('error in profileController', err);
        res.status(500).json({ message: 'profileController error'});
    };
};

const useReward = async (req, res) => {
    const { reward, customer_id } = req.body;

    try {
        const usedReward = await ProfileModel.useReward({ reward, customer_id });
        res.status.json({ message: `Used Reward: ${usedReward}`});
    } catch (err) {
        console.error('error in profileController', err);
        res.status(500).json({ message: 'profileController error'});
    }
};

const postContest = async (req, res) => {
    const { customer_id, product_type_id, name, base, variant, add_ons, story } = req.body;

    try {
        const post = await ProfileModel.postContest({ customer_id, product_type_id, name, base, variant, add_ons, story });
        res.status(200).json({ message: `Posted Recipe For Contest: ${post.name}`});
    } catch (err) {
        console.error('error in profileController', err);
        res.status(500).json({ message: 'profileController error'});
    }
};

const rsvp = async (req, res) => {
    const { event_id, customer_id } = req.body;

    try {
        const reservedEvent = await ProfileModel.rsvp({ event_id, customer_id });
        res.status(200).json({ message: `Reserved a space for: ${reservedEvent}`});
    } catch (err) {
        console.error('error in profileController', err);
        res.status(500).json({ message: 'profileController error'});
    }
};

const addReward = async (req, res) => {
    const { customer_id, reward } = req.body;

    try {
        const newReward = await ProfileModel.addReward({ customer_id, reward });
        res.status(200).json({ message: `Added Reward: ${newReward}`});
    } catch (err) {
        console.error('error in profileController', err);
        res.status(500).json({ message: 'profileController error'});
    }
};

module.exports = {
    getEvents,
    getProfileRewards,
    getCustomersEvents,
    getProfilePoints,
    useReward,
    postContest,
    rsvp,
    addReward
};



/*
const = async (req, res) => {
    try {
        res.json();
    } catch (err) {
        console.error('error in authController', err);
        res.status(500).json({ message: 'authController error'});
    }
};
 */