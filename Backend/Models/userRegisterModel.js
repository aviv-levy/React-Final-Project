const JOI = require("joi");
const mongoose = require("mongoose");
const userModelScheme = require('../Schemas/userSchema.js');



// JOI Validations
const baselineValidation = {
    firstname: JOI.string().required().min(2).max(20).alphanum(),
    lastname: JOI.string().required().min(2).max(20).alphanum(),
    middlename: JOI.string().allow('').max(20).alphanum(),
    phone: JOI.string().required().pattern(new RegExp("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$")),
    email: JOI.string().required().email(),
    password: JOI.string().required().min(6).max(40),
    img: JOI.string().uri(),
    img_alt: JOI.string(),
    state: JOI.string().alphanum(),
    country: JOI.string().alphanum().required(),
    city: JOI.string().required().min(3).max(40).pattern(new RegExp("^[A-Za-z0-9? ,_-]+$")),
    street: JOI.string().required().min(3).max(40).pattern(new RegExp("^[A-Za-z0-9? ,_-]+$")),
    housenum: JOI.number().required(),
    zip: JOI.number().min(7),
    biz: JOI.boolean()
};



// Post Validation
userModelScheme.statics.validatePost = (obj) => {
    return JOI.object({
        ...baselineValidation,
        id: JOI.string().forbidden()
    }).validate(obj, { abortEarly: false });
}

const UserRegisterModel = mongoose.model("UserRegisterModel", userModelScheme, "users");

module.exports = UserRegisterModel;
