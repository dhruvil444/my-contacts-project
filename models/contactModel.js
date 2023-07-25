const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },

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