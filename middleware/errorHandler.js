const { constants } = require("../constants")

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    console.log(statusCode);
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.status(statusCode).json({ title: "Validation error", error: err.message, stackTrace: err.stack });
            break;
        case constants.NOT_FOUND:
            res.status(statusCode).json({ title: "Resource not found", error: err.message, stackTrace: err.stack });
            break;
        case constants.UNAUTHORIZED:
            res.status(statusCode).json({ title: "Unauthorized Access", error: err.message, stackTrace: err.stack });
            break;
        case constants.FORBIDDEN:
            res.status(statusCode).json({ title: "FORBIDDEN", error: err.message, stackTrace: err.stack });
            break;
        case constants.SERVER_ERROR:
            res.status(statusCode).json({ title: "Server Error :(", error: err.message, stackTrace: err.stack });
            break;
        default:
            // res.status(statusCode).json({ error: err.message, stackTrace: err.stack });
            console.log("No Error :) All Good !");

            break;
    }


};

module.exports = errorHandler;
