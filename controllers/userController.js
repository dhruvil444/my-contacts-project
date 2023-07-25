const asyncHandler = require('express-async-handler');
const User = require("../models/userModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


const registerUser = asyncHandler(async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            res.status(400);
            throw new Error("All fields are mandatory");
        }
        const findUser = await User.findOne({ email });
        if (findUser) {
            res.status(400);
            throw new Error("User already exist");
            // res.status(200).json({ asd: "asd" });

        } else {
            const hashPassword = await bcrypt.hash(password, 10)
            const registeredUser = await User.create({ username, email, password: hashPassword })
            res.status(200).json({ _id: registeredUser.id, email: registeredUser.email });
        }

    } catch (error) {
        next(error);
    }

});

const loginUser = asyncHandler(async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400);
            throw new Error('All fields are required');
        }

        const user = await User.findOne({ email });


        if (user && (await bcrypt.compare(password, user.password))) {
            const accessToken = jwt.sign(
                {
                    user: {
                        id: user.id,
                        username: user.username,
                        email: user.email
                    },
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '60min' }
            );

            res.status(200).json({ accessToken });
        } else {
            res.status(400);
            throw new Error('Credentials are not valid');
        }
    } catch (error) {
        next(error);
    }
    // res.status(200).json({ title: "Ok" });
});

const currentUser = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);

});

module.exports = { registerUser, loginUser, currentUser };