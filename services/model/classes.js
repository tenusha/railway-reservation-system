const mongoose = require('mongoose')

const classSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    fairRatio: {
        type: Number,
        required: true,
    }
})

const trainClass = module.exports = mongoose.model('Class', classSchema)