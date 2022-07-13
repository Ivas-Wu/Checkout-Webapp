const express = require('express');
const router = express.Router();
const item = require('../controllers/item.controller');

// /api/items: GET, POST
// /api/items/:id: GET, PUT, DELETE

// create an item
router.post('/', item.create);

// get all items
router.get('/', item.findAll);

// get one item
router.get('/:id', item.findOne);

// update an item
router.put('/:id', item.update);

// delete an item
router.delete('/:id', item.delete);

module.exports = router;
