const express = require('express');
const apiroutes = express.Router();

const eventController= require('../controllers/event');

const authMiddleware = require('../middleweres/verifytoken');
const {checkRole} = require('../middleweres/checkrole')


apiroutes.get('/eventslist', eventController.getEvents);
apiroutes.post('/register', authMiddleware.verifyToken,checkRole(["admin"]),eventController.createEvent);
apiroutes.get('/events', eventController.getEvents);
apiroutes.put('/eventsupdate/:id',eventController.updateEvent);
apiroutes.delete('/delete/:id', eventController.deleteEvent);

module.exports = apiroutes