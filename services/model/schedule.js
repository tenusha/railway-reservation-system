const mongoose = require('mongoose')

const scheduleSchema = mongoose.Schema({
    time: {
        type: String,
        required: true,
    }
})

const schedule = module.exports = mongoose.model('Schedule', scheduleSchema)