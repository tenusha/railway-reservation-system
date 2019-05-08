const express = require('express')
const router = express.Router()
const contactModel = require('../model/contact')
const client = require('../client')

router.post('/railway/contact', async (req, res) => {
    try {
        const body = req.body
        var contact = new contactModel(body)
        var result = await contact.save()
        const phone = body.phone ? 'Phone :<b> ' + body.phone + ' </b><br> ' : ''
        const html = '<h2><u>User Contact</u></h2><p>Reference No : <b> ' + result._id + ' </b><br><br>Name : <b> ' + body.fname + ' ' + body.lname + ' </b><br> ' + phone + '  Email :<b> ' + body.email + ' </b><br>Message : <b>' + body.message + ' </b></p> '
        client.sendEmail({ ...body, html: html, subject: 'User Contact', email: body.email + ', sl.railway.e.ticketing@gmail.com' })
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router