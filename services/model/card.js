const mongoose = require('mongoose')

const cardSchema = mongoose.Schema({
    card: {
        type: String,
        required: true,
    },
    cvc: {
        type: String,
        required: true,
    },
    exp: {
        type: String,
        required: true,
    }
})

const card = module.exports = mongoose.model('Card', cardSchema)