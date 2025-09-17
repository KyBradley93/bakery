require('dotenv').config({ path: './server/.env' });
console.log('Database URL:', process.env.DATABASE_URL);
console.log('JWT Secret:', process.env.JWT_SECRET);
console.log('Stripe Secret Key:', process.env.STRIPE_SECRET_KEY);
console.log('Google Client ID:', process.env.GOOGLE_CLIENT_ID);
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes');
const contactRoutes = require('./routes/contactRoutes');
const donateRoutes = require('./routes/donateRoutes');
const homeRoutes = require('./routes/homeRoutes');
const orderRoutes = require('./routes/orderRoutes');
const profileRoutes = require('./routes/profileRoutes');
const threadRoutes = require('./routes/threadRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const configRoutes = require('./routes/configRoutes');
const { postPayment } = require('./controllers/postPaymentController'); // 👈 webhook handler

const app = express();

console.log('Database URL:', process.env.DATABASE_URL);
console.log('JWT Secret:', process.env.JWT_SECRET);
console.log('Stripe Secret Key:', process.env.STRIPE_SECRET_KEY);
console.log('Google Client ID:', process.env.GOOGLE_CLIENT_ID);

const corsOptions = {
  origin: 'http://localhost:3000', // React dev server origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

/** ✅ Stripe webhook route — MUST come before express.json() **/
app.post('/api/webhook', express.raw({ type: 'application/json' }), postPayment);


app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/config', configRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/donate', donateRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/thread', threadRoutes);
app.use('/api/payment', paymentRoutes);


app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
