const express = require('express')
const router = express.Router()
const routeModel = require('../model/route')

router.get('/railway/routes', async (req, res) => {
    try {
        const result = await routeModel.find()
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/railway/route/:id', async (req, res) => {
    try {
        const result = await routeModel.findOne({'_id':req.params.id})
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router