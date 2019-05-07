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

    sendEmail: async function (body) {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'sl.railway.e.ticketing@gmail.com',
                pass: 'railway@123'
            }
        });

        const html = '<h2><u>Reservation Slip</u></h2><p>Reference No : <b> ' + body.reservationID + ' </b><br><br>From <b> ' + body.from + ' </b> to <b> ' + body.to + ' </b><br>' + 'Date :<b> ' + body.date + ' </b> Time :<b> ' + body.time + ' </b><br>Train : <b>' + body.train + ' </b> Class: <b> ' + body.trainClass + ' </b><br>Quantity : <b> ' + body.qty + ' </b></p><p>Total : <b> ' + body.total + ' LKR</b></p> '
        console.log(html)
        var mailOptions = {
            from: '"Sri Lanka Railways" sl.railway.e.ticketing@gmail.com',
            to: body.email,
            subject: 'Railway e-Ticket',
            html: html
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
        const accountSid = 'AC86b7448c3ed5e78b18f44d5e84fbdcb1';
        const authToken = 'fee993da9d4cafa918929607a8b37827';
        const twilio = require('twilio')(accountSid, authToken);
        var to = body.phone
        if (to.startsWith("0")) {
            to = to.replace("0", "+94")
        }
        twilio.messages
            .create({
                body: "Sri Lanka Railway - Reservation Slip \n\n Reference No : " + body.reservationID + " \n\n From " + body.from + " to " + body.to + " \n Date : " + body.date + " \n Time : " + body.time + " \n Train : " + body.train + " \n Class: " + body.trainClass + " \n Quantity : " + body.qty + " \n Total : " + body.total + " LKR",
                from: '+18504040553',
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