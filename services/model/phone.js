const mongoose = require('mongoose')

const phoneSchema = mongoose.Schema({
    phone: {
        type: String,
        required: true,
    },
    pin: {
        type: String,
        required: true,
    }
})

const phone = module.exports = mongoose.model('Phone', phoneSchema)