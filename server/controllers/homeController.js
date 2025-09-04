const HomeModel = require('../models/homeModel');

const getContestWinner = async (req, res) => {
 try {
    const contestProducts = await HomeModel.getContest();
    const contestNum = contestProducts.length();
    const randomNum = Math.floor(Math.random(contestNum));

    const contestWinner = contestProducts[randomNum];

    res.json(contestWinner);
 } catch (err) {
    console.error('error in homeController', err);
    res.status(500).json({ message: 'homeController error'});
 }
};

const getPhotos = async (req, res) => {
 try {
    const photos = await HomeModel.getPhotos();
    res.json(photos);
 } catch (err) {
    console.error('error in homeController', err);
    res.status(500).json({ message: 'homeController error'});
 }
};

const getThreads = async (req, res) => {
 try {
    const threads = await HomeModel.getThreads();
    res.json(threads);
 } catch (err) {
    console.error('error in homeController', err);
    res.status(500).json({ message: 'homeController error'});
 }
};

module.exports = {
    getContestWinner,
    getPhotos,
    getThreads
};

