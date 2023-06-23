const JOI = require("joi");
const mongoose = require("mongoose");
const cardModelSchema = require('../Schemas/cardSchema.js');



// JOI Validations
const baselineValidation = {
    title: JOI.string().required().min(2).max(40).pattern(new RegExp("^[A-Za-z0-9? ,_-]+$")),
    subtitle: JOI.string().required().min(2).max(40).pattern(new RegExp("^[A-Za-z0-9? ,_-]+$")),
    description: JOI.string().required().max(200).pattern(new RegExp("^[A-Za-z0-9? ,_-]+$")),
    phone: JOI.string().required().pattern(new RegExp("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$")),
    email: JOI.string().required().email(),
    web: JOI.string().min(6).max(90).allow(''),
    imageUrl: JOI.string().uri().allow(''),
    imageAlt: JOI.string().allow(''),
    state: JOI.string().pattern(new RegExp("^[A-Za-z0-9? ,_-]+$")).allow(''),
    country: JOI.string().pattern(new RegExp("^[A-Za-z0-9? ,_-]+$")).required(),
    city: JOI.string().required().min(3).max(40).pattern(new RegExp("^[A-Za-z0-9? ,_-]+$")),
    street: JOI.string().required().min(3).max(40).pattern(new RegExp("^[A-Za-z0-9? ,_-]+$")),
    houseNumber: JOI.number().required(),
    zip: JOI.number().min(7).allow(''),
    userId: JOI.string()
};



// Post Validation
cardModelSchema.statics.validatePost = (obj) => {
    return JOI.object({
        ...baselineValidation,
        id: JOI.string().forbidden()
    }).validate(obj, { abortEarly: false });
}


const CardModel = mongoose.model("CardModel", cardModelSchema, "cards");

module.exports = CardModel;
