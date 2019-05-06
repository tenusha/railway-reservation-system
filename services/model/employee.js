const mongoose = require('mongoose')

const employeeSchema = mongoose.Schema({
    firstName: {
        type: 'String'
    },
    lastName: {
        type: 'String'
    },
    nic: {
        type: 'String'
    },
    address: {
        type: [
            'Mixed'
        ]
    }
})

const employee = module.exports = mongoose.model('Employee', employeeSchema)