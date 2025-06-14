const jwt = require('jsonwebtoken');

exports.authenticate = async (req, res, next) => {
    try {
        const token = req?.headers?.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).send({ error: 'Not Logged in! Login or Signup to access this resource!' });
        }
        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) {
                return res.status(401).send({ error: 'Failed to authenticate' });
            }
            req.user = null;
            req.user = decoded.id;
            req.role = decoded.role;
            next();
        });
    } catch (error) {
        return res.status(401).send({ error: 'Please login or signup to access this resource' });
    }
};
