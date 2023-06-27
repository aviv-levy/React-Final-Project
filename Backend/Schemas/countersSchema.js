const mongoose = require("mongoose");

const CardCounterchema = new mongoose.Schema({
    title:{
        type: String,
        default: 'cardCounter'
    },
    cardCounter: Number
})


const CardCounterModel = mongoose.model("CardCounterModel", CardCounterchema, "counters");

module.exports = CardCounterModel;