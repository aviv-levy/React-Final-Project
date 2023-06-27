const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
    cardNumber: Number,
    title: String,
    subtitle: String,
    description: String,
    phone: String,
    email: String,
    web: String,
    imageUrl: {
        type: String,
        default: 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg'
    },
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