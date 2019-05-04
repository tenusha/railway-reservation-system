const mongoose = require('mongoose')

const trainSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    route: {
        type: String,
        required: true,
    }
})

const train = module.exports = mongoose.model('Train', trainSchema)