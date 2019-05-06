const express = require('express')
const router = express.Router()
const UserModel = require('../model/user')

router.put('/users/:id', async (req, res) => {
    const body = req.body
    try {
        var user = await UserModel.findById(req.params.id).exec()
        user.set(body)
        var result = await user.save()
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router