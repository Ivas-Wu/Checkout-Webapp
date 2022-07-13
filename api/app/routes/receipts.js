const express = require('express');
const router = express.Router();
const receipt = require('../controllers/receipt.controller');

// /api/blog: GET, POST
// /api/blog/:id: GET, PUT, DELETE

// create a receipt
router.post('/', receipt.create);

// get all receipts
router.get('/', receipt.findAll);

// get one receipt
router.get('/:id', receipt.findOne);

// update a receipt
router.put('/:id', receipt.update);

// delete a receipt
router.delete('/:id', receipt.delete);

module.exports = router;
