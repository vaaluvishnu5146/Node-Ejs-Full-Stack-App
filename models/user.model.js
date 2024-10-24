const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 10,
        max: 20
    },
    phoneNumber: {
        type: Number,
        required: false
    },
    role: {
        type: String,
        default: "staff" // "staff", "admin", "customer", "manager"
    },
    permission: {
        type: Array,
        required: false
    },
}, { timestamps: true });

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;