const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter contact Name"]
    },

    email: {
        type: String,
        required: [true, "Please enter contact Email Address"]
    },

    phone: {
        type: String,
        required: [true, "Please enter contact Phone Number"]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Contact", userSchema);