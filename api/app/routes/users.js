const express = require('express');
const router = express.Router();
const user = require('../controllers/user.controller');

// /api/users: GET, POST
// /api/users/:id: GET, PUT, DELETE
// /api/users/active: GET

// create a user
router.post('/', user.create);

// get all users
router.get('/', user.findAll);

// get all active users
router.get('/active', user.findAllActive);

// get one user
router.get('/:id', user.findOne);

// update a user
router.put('/:id', user.update);

// delete a user
router.delete('/:id', user.delete);

module.exports = router;
