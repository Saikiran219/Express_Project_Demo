const constants = require("../constants");

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode? res.statusCode : 500; // ✅ Use `err.statusCode` if available

    res.status(statusCode).json({
        title: getErrorTitle(statusCode), // ✅ Now correctly sets "Not Found"
        message: err.message,
        stackTrace: process.env.NODE_ENV == "development" ? err.stack : "🔒"
    });
};

const getErrorTitle = (statusCode) => {
    switch (statusCode) {
        case constants.VALIDATION: return "Validation Error";
        case constants.NOT_FOUND: return "Not Found";  // ✅ Correctly sets "Not Found"
        case constants.AUTHORIZATION: return "Authorization Error";
        case constants.FORBIDDEN: return "Forbidden";
        default: return "Server Error";
    }
};

module.exports = errorHandler;
