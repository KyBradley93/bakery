const DonateModel = require('../models/donateModel');

const sponsorRequest = async (req, res) => {
    const { name, number, email, business } = req.body;

    try {
        const form = DonateModel.sponsorRequest({ name, number, email, business });
        res.status(200).json(`Made sponsor request for: ${form.business}`);
    } catch (err) {
        console.error('error in donateController', err);
        res.status(500).json({ message: 'donateController error'});
    }
};

const volunteerRequest = async (req, res) => {
    const { name, number, email } = req.body;

    try {
        const form = DonateModel.volunteerRequest({ name, number, email });
        res.status(200).json(`Made volunteer request for: ${ form.name }`);
    } catch (err) {
        console.error('error in donateController', err);
        res.status(500).json({ message: 'donateController error'});
    }
};

const getSponsors = async (req, res) => {
    try {
        const sponsors = await DonateModel.getSponsors();
        res.json(sponsors);
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
