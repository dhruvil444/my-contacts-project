const userContactModel = require('../models/contactModel');
const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');


const getContacts = asyncHandler(async (req, res) => {
    console.log("Hitted");
    const contacts = await Contact.find({ user_id: req.user.id });
    res.status(200).json({ contacts: contacts });
});

const createContact = asyncHandler(async (req, res, next) => {
    console.log(`Contact Created:`, req.body);
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        res.status(400);
        const error = new Error("All fields are mandatory !");
        next(error);
    } else {
        const contact = await Contact.create({
            user_id: req.user.id, name, email, phone
        })
        res.status(201).json({ contact });
    }
});

const getContact = asyncHandler(async (req, res, next) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            res.status(404);
            const error = new Error("Contact not found :{");
            throw error;
        } else {
            res.status(200).json({ contact: contact });
        }
    } catch (error) {
        next(error);
    }
});

const updateContact = asyncHandler(async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            res.status(404);
            const error = new Error("Contact not found :{");
            throw error;
        } else {
            const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true })
            res.status(201).json({ updatedContact });

        }
    } catch (error) {
        next(error);
    }
});

const deleteContact = asyncHandler(async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            res.status(404);
            const error = new Error("Contact not found :{");
            throw error;
        } else {
            const deletedContact = await Contact.findByIdAndRemove(req.params.id);
            res.status(200).json({ deletedContact });


        }
    } catch (error) {
        next(error);
    }
});


module.exports = { getContacts, createContact, getContact, updateContact, deleteContact };