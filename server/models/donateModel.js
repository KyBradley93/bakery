const pool = require('../db');

const sponsorRequest = async (name, number, email, business) => {
    try {
        const res = await pool.query('INSERT INTO sponsor_requests (name, number, email, business) VALUES ($1, $2, $3, $4)', [name, number, email, business]);
        return res.json();
    } catch (error) {
        console.log(`Error in donateModel: ${error}`);
    }
};

const volunteerRequest = async (name, number, email) => {
    try {
        const res = await pool.query('INSERT INTO volunteer_requests (name, number, email) VALUES ($1, $2, $3)', [name, number, email]);
        return res.json();
    } catch (error) {
        console.log(`Error in donateModel: ${error}`);
    }
};

const getSponsors = async () => {
    try {
        const res = await pool.query('SELECT * FROM sponsors');
        return res.rows;
    } catch (error) {
        console.log(`Error in donateModel: ${error}`);
    }
};

const getVolunteers = async () => {
    try {
        const res = await pool.query('SELECT * FROM volunteers');
        return res.rows;
    } catch (error) {
        console.log(`Error in donateModel: ${error}`);
    }
};

module.exports = {
    sponsorRequest,
    volunteerRequest,
    getSponsors,
    getVolunteers
};
