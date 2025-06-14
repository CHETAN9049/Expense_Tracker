const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const { authLimiter } = require("./middlewares/rateLimiter");
const mongoConnection = require("./config/mongodb");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rate Limiter Middleware
app.use(authLimiter);

// Routes
app.use("/auth", authRoutes);
app.use("/expenses", expenseRoutes);

// DB Connection
mongoConnection();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));