const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required for Admin"]
    },
    email: {
        type: String,
        required: [true, 'Email required for Admin'],
        unique: [true, 'Email already available']
    },
    password: {
        type: String,
        required: [true, 'Password required for Admin']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Admin', adminSchema)