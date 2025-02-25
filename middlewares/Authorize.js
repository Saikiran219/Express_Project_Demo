const asyncHandler = require('express-async-handler');

// Middleware to check if the user is an admin
const authorizetoken = (role) => {
    return asyncHandler((req, res, next) => {
        if (req.user && req.user.isAdmin === role) {
            next(); // Proceed to the next middleware or route handler
        } else {
            res.status(403);
            throw new Error('You do not have permission to access this resource');
        }
    });
};

module.exports = authorizetoken;
