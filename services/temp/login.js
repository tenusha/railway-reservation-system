const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const UserModel = require('../model/user')

router.post('/login', (req, res) => {
    const body = req.body
    const username = body.username
    const password = body.password

    try {
        UserModel.findOne({email: username, password: password}, (err, val) => {
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

router.post('/jwt', (req, res) => {
    const body = req.body

    const user = {
        _id: "xsndbahdgbauygw7",
        username: "Tenusha",
        email: "tenushamadhushan@gmail.com",
        password: "123"
    }

    const username = body.username
    const password = body.password

    jwt.sign({user}, "key", {expiresIn: '50s'}, (err, token) => {
        res.status(200).json({token})
    })


});

router.get('/protected', verifyToken, (req, res) => {
    const body = req.body
    const username = body.username
    const password = body.password

    jwt.verify(req.token, "key", (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            res.status(200).json({
                "message": "Authentication success",
                authData
            })
        }
    })
});

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization']

    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        req.token = bearerToken
        next()
    } else {
        res.status(401).json({message: 'unauthorized'})
    }
}

module.exports = router