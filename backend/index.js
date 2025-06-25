require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoConnection = require('./config/mongodb');
const authRouter = require('./routes/authRoutes');
const expenseRouter = require('./routes/expenseRoutes');
const userRouter = require('./routes/userRoutes');
const adminRouter = require('./routes/adminRoutes');
const { authLimiter } = require('./middlewares/rateLimiter');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
  origin: 'https://frontend-black-rho-67.vercel.app',
  credentials: true // if you use cookies
}));

// Rate limiter for auth routes
app.use(authLimiter);

// Routers
app.use('/auth', authRouter);
app.use('/expenses', expenseRouter);
app.use('/user', userRouter);
app.use('/admin', adminRouter);

app.get('/', (req, res) => {
    return res.status(200).send({ message: 'Server is successfully running' });
});

// Connect to DB
mongoConnection();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});