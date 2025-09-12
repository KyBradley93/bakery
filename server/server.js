require('dotenv').config();
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
const { postPayment } = require('./controllers/postPaymentController'); // 👈 webhook handler

const app = express();

app.use(cors());

/** ✅ Stripe webhook route — MUST come before express.json() **/
app.post('/api/webhook', express.raw({ type: 'application/json' }), postPayment);


app.use(express.json());

app.use('api/auth', authRoutes);
app.use('api/cart', cartRoutes);
app.use('api/contact', contactRoutes);
app.use('api/donate', donateRoutes);
app.use('api/home', homeRoutes);
app.use('api/order', orderRoutes);
app.use('api/profile', profileRoutes);
app.use('api/thread', threadRoutes);
app.use('api/payment', paymentRoutes);


app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
