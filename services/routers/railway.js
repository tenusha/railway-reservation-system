const express = require('express')
const router = express.Router()
const routeModel = require('../model/route')
const trainModel = require('../model/train')
const classModel = require('../model/classes')
const scheduleModel = require('../model/schedule')
const reservationModel = require('../model/reservation')

router.get('/railway/routes', async (req, res) => {
    try {
        const result = await routeModel.find()
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/railway/route/:id', async (req, res) => {
    try {
        const result = await routeModel.findOne({'_id':req.params.id})
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/railway/trains', async (req, res) => {
    try {
        const result = await trainModel.find()
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/railway/trains/:route', async (req, res) => {
    try {
        const route = await routeModel.findOne({'_id':req.params.route})
        const result = await trainModel.find({route:route.name})
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/railway/classes', async (req, res) => {
    try {
        const result = await classModel.find()
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/railway/schedules', async (req, res) => {
    try {
        const result = await scheduleModel.find()
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.post('/railway/reservations', async (req, res) => {
    try {
        var reservation = new reservationModel(req.body)
        var result = await reservation.save()
        res.status(200).json(result)
    }
    catch (err) {
        res.status(500).json(err)
    }
});

router.get('/railway/reservations', async (req, res) => {
    try {
        const result = await reservationModel.find()
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/railway/reservations/:user', async (req, res) => {
    try {
        const result = await reservationModel.find({user:req.params.user})
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.delete('/railway/reservations/:id', async (req, res) => {
    try {
        const result = await reservationModel.deleteOne({_id:req.params.id}).exec()
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router