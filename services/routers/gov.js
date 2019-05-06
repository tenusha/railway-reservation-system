const express = require('express')
const router = express.Router()
const employeeModel = require('../model/employee')

router.get('/gov/employee/:nic', (req, res) => {
    try {
        employeeModel.findOne({ nic: req.params.nic }, (err, val) => {
            if (err) {
                console.log(err);
            } else {
                if (val) {
                    res.status(200).json({ validated: true })
                } else {
                    res.status(200).json({ validated: false })
                }
            }
        });
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router