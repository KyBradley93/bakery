const pool = require('../db');

const getContest = async () => {
    try {
        const res = await pool.query('SELECT * FROM contest');
        return res.rows;
    } catch (error) {
        console.log(`Error in homeModel: ${error}`);
        throw error;
    }
};

const getPhotos = async () => {
    try {
        const res = await pool.query('SELECT * FROM photos');
        return res.rows;
    } catch (error) {
        console.log(`Error in homeModel.getPhotos: ${error}`);
        throw error;
    }
};

const getThreads = async () => {
    try {
        const res = await pool.query('SELECT * FROM threads');
        return res.rows;
    } catch (error) {
        console.log(`Error in homeModel: ${error}`);
        throw error;
    }
}

module.exports = {
    getContest,
    getPhotos,
    getThreads
};
