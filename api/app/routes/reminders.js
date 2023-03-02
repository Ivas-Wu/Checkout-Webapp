const express = require('express');
const router = express.Router();
const reminder = require('../controllers/reminder.controller');

// /api/reminders: GET, POST
// /api/reminders/:id: GET, PUT, DELETE

// create a reminder
router.post('/', reminder.create);

// check if any reminders are due to be alerted today for a given user
router.get('/alerts', reminder.findAlerts)

// get all reminder
router.get('/', reminder.findAll);

// get one reminder
router.get('/:id', reminder.findOne);

// update a reminder
router.put('/:id', reminder.update);

// delete a reminder
router.delete('/:id', reminder.delete);


module.exports = router;
