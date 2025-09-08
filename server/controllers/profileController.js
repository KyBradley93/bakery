const ProfileModel = require('../models/profileModel');

const getEvents = async (req, res) => {
    try {
        const events = await ProfileModel.getEvents();
        res.status(200).json(events);
    } catch (err) {
        console.error('error in profileController', err);
        res.status(500).json({ message: 'profileController error'});
    };
};

const getProfileRewards = async (req, res) => {
    const customer_id = req.customer?.id;

    if (!customer_id) {
        return res.status(400).json({ message: 'Missing customer ID' });
    };

    try {
        const rewards = await ProfileModel.getProfileRewards({ customer_id });
        res.status(200).json(rewards);
    } catch (err) {
        console.error('error in profileController', err);
        res.status(500).json({ message: 'profileController error'});
    };
};

const getProfileEvents = async (req, res) => {
    const customer_id = req.customer?.id;

    if (!customer_id) {
        return res.status(400).json({ message: 'Missing customer ID' });
    };

    try {
        const events = await ProfileModel.getProfileEvents({ customer_id });
        res.status(200).json(events);
    } catch (err) {
        console.error('error in profileController', err);
        res.status(500).json({ message: 'profileController error'});
    }
};

const getProfilePoints = async (req, res) => {
    const customer_id = req.customer?.id;

    if (!customer_id) {
        return res.status(400).json({ message: 'Missing customer ID' });
    };

    try {
        const points = await ProfileModel.getProfilePoints({ customer_id });
        res.status(200).json(points);
    } catch (err) {
        console.error('error in profileController', err);
        res.status(500).json({ message: 'profileController error'});
    };
};

const useReward = async (req, res) => {
    const { reward } = req.body;

    const customer_id = req.customer?.id;

    if (!customer_id) {
        return res.status(400).json({ message: 'Missing customer ID' });
    };

    try {
        await ProfileModel.useReward({ reward, customer_id });
        res.status(200).json({ message: `Used Reward: ${reward}`});
    } catch (err) {
        console.error('error in profileController', err);
        res.status(500).json({ message: 'profileController error'});
    }
};

const postContest = async (req, res) => {
    const { product_type_id, name, base, variant, add_ons, story } = req.body;

    const customer_id = req.customer?.id;

    if (!customer_id) {
        return res.status(400).json({ message: 'Missing customer ID' });
    };

    try {
        await ProfileModel.postContest({ customer_id, product_type_id, name, base, variant, add_ons, story });
        res.status(200).json({ message: `Posted Recipe For Contest: ${name}`});
    } catch (err) {
        console.error('error in profileController', err);
        res.status(500).json({ message: 'profileController error'});
    }
};

const rsvp = async (req, res) => {
    const { event_id } = req.body;

    const customer_id = req.customer?.id;

    if (!customer_id) {
        return res.status(400).json({ message: 'Missing customer ID' });
    };

    try {
        await ProfileModel.rsvp({ event_id, customer_id });
        res.status(200).json({ message: `Reserved a space for you!`});
    } catch (err) {
        console.error('error in profileController', err);
        res.status(500).json({ message: 'profileController error'});
    }
};

const addReward = async (req, res) => {
    const { reward } = req.body;

    const customer_id = req.customer?.id;

    if (!customer_id) {
        return res.status(400).json({ message: 'Missing customer ID' });
    };

    try {
        await ProfileModel.addReward({ customer_id, reward });
        res.status(200).json({ message: `Added Reward` });
    } catch (err) {
        console.error('error in profileController', err);
        res.status(500).json({ message: 'profileController error'});
    }
};

//npx jest --onlyFailures



module.exports = {
    getEvents,
    getProfileRewards,
    getProfileEvents,
    getProfilePoints,
    useReward,
    postContest,
    rsvp,
    addReward
};
