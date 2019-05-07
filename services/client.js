const fetch = require("node-fetch")
const nodemailer = require('nodemailer')

module.exports = {
    validateNIC: function (nic) {
        return fetch('http://localhost:3001/gov/employee/' + nic)
            .then(handleErrors)
            .then(res => res.json())
            .then(data => {
                return data.validated
            })
            .catch(err => {
                console.log(err)
            })
    },

    sendEmail: function (body) {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'sl.railway.e.ticketing@gmail.com',
                pass: 'railway@123'
            }
        });

        var mailOptions = {
            from: '"Sri Lanka Railways" sl.railway.e.ticketing@gmail.com',
            to: body.email,
            subject: 'Railway e-Ticket',
            html: "<h2><u>Reservation Slip</u></h2><p>Reference No : <b> " + body.reservationID + " </b></p><p>From <b> " + body.from + " </b> to <b> " + body.to + " </b></p><p>" + "Date :<b> " + body.date + " </b> Time :<b> " + body.time + " </b></p><p>Train : <b>" + body.train + " </b> Class: <b> " + body.trainClass + " </b></p><p>Quantity : <b>" + body.qty + " </b></p><p>Total : <b>" + body.total + " LKR</b></p>"
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error)
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    },

    sendTextMessage: function (body) {
        console.log(body)
        console.log("message sent to :" + body.phone)
    }
}
handleErrors = response => {
    if (!response.ok) {
        throw new Error("Request failed " + response.statusText)
    }
    return response
}