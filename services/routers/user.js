const express = require('express')
const router = express.Router()
const UserModel = require('../model/user')
const client = require('../client')

router.put('/users/:id', async (req, res) => {
    const body = req.body
    try {
        var user = await UserModel.findById(req.params.id).exec()
        const discount = body.nic ? await client.validateNIC(body.nic) : false
        user.set({ ...body, discount: discount })
        var result = await user.save()
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router