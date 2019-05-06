const express = require('express')
const router = express.Router()
const contactModel = require('../model/contact')

router.post('/railway/contact', async (req, res) => {
    try {
        var contact = new contactModel(req.body)
        var result = await contact.save()
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router