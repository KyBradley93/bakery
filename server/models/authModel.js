const pool = require('../db');

const login = async (id) => {
    try {
        const res = await pool.query('SELECT * FROM customers WHERE id = $1', [id]);
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

const googleLogin = async (google_id) => {
    try {
        const res = await pool.query('SELECT * FROM customers WHERE google_id = $1', [google_id]);
        return res.rows;
    } catch (error) {
        console.log(`Error in authModel: ${error}`);
    }
}


module.exports = {
    login,
    register,
    googleLogin
};