const { response } = require("express");

exports.requiredRole = (allowedRoles = []) => {
    return (req, res, next) => {
        const role = req.role;
        if (!role || !allowedRoles.includes(role)) {
            return res.status(403).send({ error: 'Access denied, no permission to do the action' });
        }
        next();
    };
};
