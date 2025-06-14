const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const rateLimiter = require("./middlewares/rateLimiter");
const mongoConnection = require("./config/mongodb");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Rate Limiter Middleware
app.use(rateLimiter);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);

// DB Connection
mongoConnection();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));