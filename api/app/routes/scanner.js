const express = require('express');
const router = express.Router();
const scanner = require('../controllers/scanner.controller');

// call scanner API
router.get('/', scanner.scan);

module.exports = router;
