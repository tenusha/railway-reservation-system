const fetch = require("node-fetch")
const nodemailer = require('nodemailer')
const config = require('./config.json')

const twilio = require('twilio')(config.messageClient.accountSid, config.messageClient.authToken);

module.exports = {
    validateNIC: function (nic) {
        return fetch(config.govAPI + nic)
            .then(handleErrors)
            .then(res => res.json())
            .then(data => {
                return data.validated
            })
            .catch(err => {
                console.log(err)
            })
    },

    sendEmail: async function (body) {

        const emailConfig = config.emailClient

        const transporter = nodemailer.createTransport({
            host: emailConfig.host,
            port: 465,
            secure: true,
            auth: emailConfig.auth
        });

        var mailOptions = {
            from: '"Sri Lanka Railways"' + emailConfig.email,
            to: body.email,
            subject: body.subject,
            html: body.html
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error)
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    },

    sendTextMessage: async function (body) {
        var to = body.phone
        if (to.startsWith("0")) {
            to = to.replace("0", "+94")
        }
        twilio.messages
            .create({
                body: "Sri Lanka Railway - Reservation Slip \n\n Reference No : " + body.reservationID + " \n\n From " + body.from + " to " + body.to + " \n Date : " + body.date + " \n Time : " + body.time + " \n Train : " + body.train + " \n Class: " + body.trainClass + " \n Quantity : " + body.qty + " \n Total : " + body.total + " LKR",
                from: config.messageClient.phoneNo,
                to: to
            })
            .then(message => console.log(message.sid))
            .catch(err => console.log(err))
    }
}
handleErrors = response => {
    if (!response.ok) {
        throw new Error("Request failed " + response.statusText)
    }
    return response
}