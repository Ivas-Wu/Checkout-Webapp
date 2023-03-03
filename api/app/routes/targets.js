const express = require('express');
const router = express.Router();
const target = require('../controllers/target.controller');

// /api/targets: GET, POST
// /api/targets/:id: GET, PUT, DELETE

// create a target
router.post('/', target.create);

// create a target
router.get('/total', target.total);

// get all targets
router.get('/', target.findAll);

// get one target
router.get('/:id', target.findOne);

// update a target
router.put('/:id', target.update);

// delete a target
router.delete('/:id', target.delete);

module.exports = router;
