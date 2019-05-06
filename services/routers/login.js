const express = require('express')
const router = express.Router()
const UserModel = require('../model/user')

router.post('/login', (req, res) => {
    const body = req.body
    const username = body.username
    const password = body.password

    try {
        UserModel.findOne({ email: username, password: password }, (err, val) => {
            if (err) {
                console.log(err);
            } else {
                if (val) {
                    res.status(200).json(val)
                } else {
                    res.status(401).json("unauthorized")
                }
            }
        });
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router