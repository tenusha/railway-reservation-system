const express = require('express')
const router = express.Router()
const UserModel = require('../model/user')

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
            var user = new UserModel(body)
            var result = await user.save()
            res.status(200).json(result)
        }
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router