const express = require('express')
const router = express.Router()
const UserModel = require('../model/user')
const client = require('../client')

router.post('/register', async (req, res) => {
    const body = req.body
    const email = body.email

    var exist = ""
    try {
        await UserModel.findOne({ email: email }, (err, val) => {
            if (err) {
                console.log(err);
            } else {
                exist = val
            }
        });

        if (exist) {
            res.status(409).json({ exist: true })
        } else {
            const discount = await client.validateNIC(body.nic)
            var user = new UserModel({ ...body, discount: discount })
            var result = await user.save()
            res.status(200).json(result)
        }
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router