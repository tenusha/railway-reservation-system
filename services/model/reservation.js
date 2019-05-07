const mongoose = require('mongoose')

const reservationSchema = mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    train: {
        type: String,
        required: true,
    },
    trainClass: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    qty: {
        type: Number,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    card:{
        type: String
    },
    phone:{
        type: String
    },
    email:{
        type: String
    }
})

const reservation = module.exports = mongoose.model('Reservation', reservationSchema)