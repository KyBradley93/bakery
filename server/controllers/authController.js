const AuthModel = require('../models/authModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const login = async (req, res) => {
    const { name, password } = req.body;
    if (!name || !password) {
        return res.status(400).json({ error: 'Name and password are required' });
    }

    try {

        const customer = await AuthModel.getCustomerByName(name);

        if (!customer) {
            return res.status(404).json({ error: 'User not found' });
        };

        const isValid = await bcrypt.compare(password, customer.password);
        if (!isValid) {
            return res.status(400).json({ error: 'Invalid password' });
        };

        const token = jwt.sign(
            { id: customer.id, name: customer.name },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        console.error('Login error:', err);  // More specific logging
        res.status(500).json({ message: 'Internal server error during login' });
    }
};

const register = async (req, res) => {
    const { name, password } = req.body || {};

    if (!name || !password) {
        return res.status(400).json({ error: 'Name and password are required' });
    }


    try {
        const nameCheck = await AuthModel.getCustomerName( name );

        // Defensive check
        if (!Array.isArray(nameCheck)) {
            return res.status(500).json({ error: 'Unexpected response from database' });
        }

        if (nameCheck.length > 0) return res.status(400).json({ error: 'Name already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);

        await AuthModel.register( name, hashedPassword );

        res.status(201).json({ message: 'Registered successfully' });
    } catch (err) {
        console.error('error in authController', err);
        res.status(500).json({ message: 'authController error'});
    }
};

const googleLogin = async (req, res, injectedClient = client) => {
    const { token } = req.body;

    try {
        // Check if injectedClient is an OAuth2Client
        if (!(injectedClient instanceof OAuth2Client)) {
            return res.status(500).json({ message: 'Invalid client injected' });
        }

        console.log('Received Token:', token);
        // Log injectedClient to ensure it's correct
        console.log('InjectedClient:', injectedClient);

        const ticket = await injectedClient.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        console.log('Ticket:', ticket);

        console.log(injectedClient); // Check the injectedClient object
        console.log(process.env.GOOGLE_CLIENT_ID);



        const payload = ticket.getPayload();

        console.log('Decoded Payload:', payload);

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