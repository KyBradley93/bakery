const AuthModel = require('../models/authModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const login = async (req, res) => {
    const { name, password } = req.body;
    try {

        const customer = AuthModel.getCustomer({ name, password });
        if (!customer) {
            return res.status(404).json({ error: 'User not found' });
        };

        const isValid = await bcrypt.compare(password, customer.password);
        if (!isValid) {
            return res.status(400).json({ error: 'Invalid password' });
        };

        const token = jwt.sign(
            { id: customer._id, name: customer.name },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ message: 'Login successful', token });
    } catch (err) {
        console.error('error in authController', err);
        res.status(500).json({ message: 'authController error'});
    }
};

const register = async (req, res) => {
    const { name, password } = req.body;

    try {
        const nameCheck = await AuthModel.getCustomerName({ name });
        if (nameCheck.rows.length > 0) return res.status(400).json({ error: 'Name already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);

        await AuthModel.register({ name, hashedPassword });

        res.status(201).json({ message: 'Registered successfully' });
    } catch (err) {
        console.error('error in authController', err);
        res.status(500).json({ message: 'authController error'});
    }
};

const googleLogin = async (req, res) => {
    const { token } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = await ticket.getPayload();
        const { sub: googleId, email, name } = payload;

        let user = await AuthModel.getCustomerByGoogleId(googleId);

        if (user.rows.length === 0) {
            await AuthModel.googleRegister({ name, email, googleId });

            user =  await AuthModel.getCustomerByGoogleId(googleId);
        };

        const customer = user.rows[0];

        const jwtToken = jwt.sign(
            { id: customer.id, name: customer.name },
            process.env.JWT_SECRET,
            { expiresIn: '1h'}
        );

        res.json({ message: 'Google login successful', token: jwtToken });

    } catch (err) {
        console.error('error in authController', err);
        res.status(500).json({ message: 'authController error'});
    }
};

module.exports = {
    login,
    register,
    googleLogin
}

/*
const = async (req, res) => {
    try {
        res.json();
    } catch (err) {
        console.error('error in authController', err);
        res.status(500).json({ message: 'authController error'});
    }
};
 */