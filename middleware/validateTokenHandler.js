const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    try {
        if (authHeader && authHeader.startsWith("Bearer")) {
            token = authHeader.split(" ")[1];
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {

                if (err) {
                    res.status(401);
                    throw new Error('User is not authorized');
                } else {
                    console.log(decode);
                    req.user = decode.user;
                    next();
                }



            });
        } else {
            res.status(401);
            throw new Error("Token is missing");
        }
    } catch (error) {
        next(error);
    }


}

module.exports = validateToken;