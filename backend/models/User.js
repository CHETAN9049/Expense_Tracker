const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    lowBalanceThreshold: {
        type: Number,
    },
    categoryLimits: {
        type: Map,
        of: Number,
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
