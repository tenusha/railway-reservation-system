'use strict';
const express = require('express');
const app = express();
const login = require('./routers/login');
const register = require('./routers/register');
const railway = require('./routers/railway');
const payment = require('./routers/payment');
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/railway')

app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(login);
app.use(register);
app.use(railway);
app.use(payment);

app.listen(3001, err => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('app listening on port 3001');
});