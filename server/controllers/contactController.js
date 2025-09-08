const ContactModel = require('../models/contactModel');

const getContacts = async (req, res) => {
    try {
        const contacts = await ContactModel.getContacts();
        res.status(200).json(contacts);
    } catch (err) {
        console.error('error in contactController', err);
        res.status(500).json({ message: 'contactController error' });
    }
};

const contactRequest = async (req, res) => {
    const { name, number, email, message } = req.body;

    try {
        await ContactModel.contactRequest({ name, number, email, message });
        res.status(200).json({message: `Made contact request: ${message}`});
    } catch (err) {
        console.error('error in contactController', err);
        res.status(500).json({ message: 'contactController error'});
    }
};

module.exports = {
    getContacts,
    contactRequest
};
