const pool = require('../db');

const getCustomer = async (name, password) => {
    try {
        const res = await pool.query('SELECT * FROM customers WHERE name = $1 AND password = $2', [name, password]);
        return res.rows;
    } catch (error) {
        console.log(`Error in authModel: ${error}`);
    }

};

const getCustomerName = async (name) => {
    try {
        const res = await pool.query('SELECT * FROM customers WHERE name = $1', [name]);
        return res.rows;
    } catch (error) {
        console.log(`Error in authModel: ${error}`);
    }

};

const getCustomerByGoogleId = async (google_id) => {
    try {
        const res = await pool.query('SELECT * FROM customers WHERE google_id = $1', [google_id]);
        return res.rows;
    } catch (error) {
        console.log(`Error in authModel: ${error}`);
    }

};

const login = async (name, password) => {
    try {
        const res = await pool.query('SELECT * FROM customers WHERE name = $1 AND password = $2', [name, password]);
        return res.rows;
    } catch (error) {
        console.log(`Error in authModel: ${error}`);
    }

};

const register = async (name, password) => {
    try {
        const res = await pool.query('INSERT INTO customers (name, password) VALUES ($1, $2)', [name, password]);
        return res.json();
    } catch (error) {
        console.log(`Error in authModel: ${error}`);
    }
};

const googleRegister = async (name, email, googleId) => {
    try {
        const res = await pool.query('INSERT INTO customers (name, email, google_id) VALUES ($1, $2)', [name, email, googleId]);
        return res.json();
    } catch (error) {
        console.log(`Error in authModel: ${error}`);
    }
};

module.exports = {
    getCustomer,
    getCustomerName,
    login,
    register,
    googleRegister,
    getCustomerByGoogleId
};