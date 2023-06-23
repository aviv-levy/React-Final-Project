const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    description: String,
    phone: String,
    email: String,
    web: String,
    imageUrl: String,
    imageAlt: String,
    state: String,
    country: String,
    city: String,
    street: String,
    houseNumber: Number,
    zip: Number,
    userId: String
})

module.exports = CardSchema;