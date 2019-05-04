const mongoose = require('mongoose')

const routeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    route: [
        {
            name: {
                type: String,
                required: true,
            },
            fair: {
                type: Number,
                required: true,
            }
        }
    ]
})

const route = module.exports = mongoose.model('Route', routeSchema)