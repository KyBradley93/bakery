const pool = require('../db');

const getEvents = async () => {
    try {
        const res = await pool.query('SELECT * FROM events');
        return res.rows; 
    } catch (error) {
        console.log(`Error in profileModel: ${error}`);
    }
};

const getProfileRewards = async (customer_id) => {
    try {
        const res = await pool.query('SELECT * FROM profile_rewards WHERE customer_id = $1', [customer_id]);
        return res.rows;
    } catch (error) {
        console.log(`Error in profileModel: ${error}`);
    }
};

const getCustomersEvents = async (customer_id) => {
    try {
        const res = await pool.query(
            'SELECT e.* FROM events_attendees ea JOIN events e ON ea.event_id = e.id WHERE ea.customer_id = $1', 
            [customer_id]
        );
        return res.rows;
    } catch (error) {
        console.log(`Error in profileModel: ${error}`);
    }
};

const getProfilePoints = async (customer_id) => {
    try {
        const res = await pool.query('SELECT * FROM profile_points WHERE customer_id = $1', [customer_id]);
        return res.rows;
    } catch (error) {
        console.log(`Error in profileModel: ${error}`);
    }
};

const useReward = async (reward, customer_id) => {
    try {
        const res = await pool.query('UPDATE profile_rewards SET quantity = quantity - 1 WHERE reward = $1 AND customer_id = $2', [reward, customer_id]);
        return res.json;
    } catch (error) {
        console.log(`Error in profileModel: ${error}`);
    }
};

const postContest = async (customer_id, product_type_id, name, base, variant, add_ons, story) => {
    try {
        const res = await pool.query('INSERT INTO contest (customer_id, product_type_id, name, base, variant, add_ons, story) VALUES ($1, $2, $3, $4, $5, $6, $7)', [customer_id, product_type_id, name, base, variant, add_ons, story]);
        return res.json();
    } catch (error) {
        console.log(`Error in profileModel: ${error}`);
    }
};

const rsvp = async (event_id, customer_id) => {
    try {
        const res = await pool.query('INSERT INTO events_attendees (event_id, customer_id) VALUES ($1, $2)', [event_id, customer_id]);
        return res.json();
    } catch (error) {
        console.log(`Error in profileModel: ${error}`);
    }
};

const addReward = async (customer_id, reward) => {
    try {
        const res = await pool.query('UPDATE profile_rewards SET quantity = quantity + 1 WHERE customer_id = $1 AND reward = $2', [customer_id, reward]);
        return res.json();
    } catch (error) {
        console.log(`Error in profileModel: ${error}`);
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
