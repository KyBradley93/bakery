const pool = require('../db');

const getContacts = async () => {
    try {
        const res = await pool.query('SELECT * FROM contacts');
        return res.rows;
    } catch (error) {
        console.log(`Error in contactModel: ${error}`);
    }
};

const contactRequest = async (name, number, email, message) => {
    try {
        const res = pool.query('INSERT INTO contact_requests (name, number, email, message) VALUES ($1, $2, $3, $4)', [name, number, email, message]);
        return res.json();
    } catch (error) {
        console.log(`Error in contactModel: ${error}`);
    }
}



module.exports = {
    getContacts,
    contactRequest
};
