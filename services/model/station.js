const mongoose = require('mongoose')

const stationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    fair: {
        type: Number,
        required: true,
    }
})

const station = module.exports = mongoose.model('Station', stationSchema)