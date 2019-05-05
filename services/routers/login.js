const express = require('express')
const router = express.Router()
const UserModel = require('../model/user')

router.post('/login', (req, res) => {
    const body = req.body
    const username = body.username
    const password = body.password

    UserModel.findOne({ email: username }, (err, val) => {
        if (err) {
            console.log(err);
        } else {
            var user = val
            if (user && user.password && user.password === password) {
                res.status(200).json(user)
            } else {
                res.status(401).json("unauthorized")
            }
        }
    });
});

module.exports = router