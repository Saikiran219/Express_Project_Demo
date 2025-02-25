const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const util = require("util");

const verifyTokenAsync = util.promisify(jwt.verify);

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
    }
    if (!token) {
        res.status(401);
        throw new Error("User is not authorized. Token is missing.");
    }

    try {
        const decoded = await verifyTokenAsync(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded.user;  
        next();
    } catch (err) {
        res.status(401);
        throw new Error("User is not authorized. Invalid token.");
    }
});

module.exports = validateToken;
