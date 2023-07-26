const asyncHandler = require('express-async-handler');
const Contacts = require('../models/contactModel');
const Users = require('../models/userModel');
const bcrypt = require('bcrypt');
const Admin = require('../models/adminModel');
const jwt = require('jsonwebtoken')


const register = asyncHandler(async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (!email || !password) {
            res.status(400);
            throw new Error("All fields are required");
        }

        const adminUser = await Admin.findOne({ email });

        if (adminUser) {
            res.status(400);
            throw new Error("Email already taken by another admin");
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const admin = await Admin.create({ name, email, password: hashPassword });
        res.status(200).json({ admin });
    } catch (error) {
        next(error);
    }

});

const login = asyncHandler(async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400);
            throw new Error("All fields are required");
        }
        const adminUser = await Admin.findOne({ email });

        if (!adminUser) {
            res.status(400);
            throw new Error("Admin not available");
        }

        if (adminUser && (await bcrypt.compare(password, adminUser.password))) {
            const accessToken = jwt.sign(
                {
                    admin: {
                        id: adminUser.id,
                        username: adminUser.name,
                        email: adminUser.email
                    },
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '60min' }
            );

            res.status(200).json({ accessToken: accessToken });

        } else {
            res.status(400);
            throw new Error('Credentials are not valid');
        }


    } catch (error) {
        next(error);
    }
});

const getContacts = asyncHandler(async (req, res, next) => {
    const contacts = await Contacts.find();
    res.status(200).json({ contacts });
});

const getUsers = asyncHandler(async (req, res, next) => {
    const users = await Users.find();
    res.status(200).json({ users });
});

const updateUser = asyncHandler(async (req, res, next) => {
    try {
        // console.log(req.params);
        const userId = req.params.id;
        console.log(userId);

        const isUserAvailable = await Users.findById(userId);
        if (!isUserAvailable) {
            // console.log(userId);

            res.status(404);
            throw new Error("User not found");
        }

        const user = await Users.findByIdAndUpdate(req.params.id, req.body, { new: true });
        console.log(userId);


        res.status(200).json({ user });
    } catch (error) {
        next(error);
    }
});



// const getC = (req, res, next) => { }

module.exports = { register, getContacts, login, getUsers, updateUser }