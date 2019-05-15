'use strict'
const express = require('express')
const app = express()
const config = require('./config.json')
const login = require('./routers/login')
const register = require('./routers/register')
const railway = require('./routers/railway')
const payment = require('./routers/payment')
const gov = require('./routers/gov')
const user = require('./routers/user')
const contact = require('./routers/contact')
const mongoose = require('mongoose')

mongoose.connect(config.mongoDB, { useNewUrlParser: true }, function (err) {
    if (err) throw err
    console.log('mongo db connected')
}).catch(err => console.log(err))

app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

app.use(login)
app.use(register)
app.use(railway)
app.use(payment)
app.use(gov)
app.use(user)
app.use(contact)

app.listen(3001, err => {
    if (err) {
        console.error(err)
        return
    }
    console.log('app listening on port 3001')
});