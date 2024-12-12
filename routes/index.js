const express = require('express');
const apiroutes = express.Router();

const user = require('./user');
const event = require('./event');

apiroutes.use('/user',user);
apiroutes.use('/event',event);

module.exports = apiroutes;