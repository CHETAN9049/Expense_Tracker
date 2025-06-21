const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

exports.authenticate = async (req, res, next) => {
    try {
        const token = req?.headers?.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).send({ error: 'Not Logged in! Login or Signup to access this resource!' });
        }
        jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
            if (error) {
                return res.status(401).send({ error: 'Failed to authenticate' });
            }
            try {
                const user = await User.findById(decoded.id);
                if (!user) {
                    return res.status(401).send({ error: 'User not found' });
                }
                req.user = user; 
                req.role = decoded.role;
                next();
            } catch (err) {
                return res.status(401).send({ error: 'User lookup failed' });
            }
        });
    } catch (error) {
        return res.status(401).send({ error: 'Please login or signup to access this resource' });
    }
};