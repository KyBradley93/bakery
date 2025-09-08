const DonateModel = require('../models/donateModel');

const sponsorRequest = async (req, res) => {
    const { name, number, email, business } = req.body;

    try {
        await DonateModel.sponsorRequest({ name, number, email, business });
        res.status(200).json({ message: `Made sponsor request for: ${business}` });
    } catch (err) {
        console.error('error in donateController', err);
        res.status(500).json({ message: 'donateController error'});
    }
};

const volunteerRequest = async (req, res) => {
    const { name, number, email } = req.body;

    try {
        await DonateModel.volunteerRequest({ name, number, email });
        res.status(200).json({ message: `Made volunteer request for: ${ name }` });
    } catch (err) {
        console.error('error in donateController', err);
        res.status(500).json({ message: 'donateController error'});
    }
};

const getSponsors = async (req, res) => {
    try {
        const sponsors = await DonateModel.getSponsors();
        res.status(200).json(sponsors);
    } catch (err) {
        console.error('error in donateController', err);
        res.status(500).json({ message: 'donateController error'});
    }
};

const getVolunteers = async (req, res) => {
    try {
        const volunteers = await DonateModel.getVolunteers();
        res.json(volunteers);
    } catch (err) {
        console.error('error in donateController', err);
        res.status(500).json({ message: 'donateController error'});
    }
};

module.exports = {
    sponsorRequest,
    volunteerRequest,
    getSponsors,
    getVolunteers
};
