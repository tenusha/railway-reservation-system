const express = require('express')
const router = express.Router()
const stationModel = require('../model/station')

router.get('/railway/stations', async (req, res) => {
    try {
        const result = await stationModel.find()
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router