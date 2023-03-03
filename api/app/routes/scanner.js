const express = require('express');
const router = express.Router();
const scanner = require('../controllers/scanner.controller');
const multer = require('multer')

var upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB file size limit
  }
});

// call scanner API
router.post('/', upload.single('file'), scanner.scan);
router.get('/', scanner.scan);

module.exports = router;
