const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    middlename: String,
    phone: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: String,
    img: String,
    img_alt: String,
    state: String,
    country: String,
    city: String,
    street: String,
    housenum: Number,
    zip: Number,
    biz: Boolean,
    likedCards: Array
})


module.exports = UserSchema;