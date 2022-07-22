const express = require('express');
const router = express.Router();
const scanner = require('../controllers/scanner.controller');
const multer = require('multer')

var storage = multer.diskStorage(
  {
    destination: './app/controllers/scanner_util/uploads/',
    filename: function (req, file, cb) {
      cb(null, 'current_receipt.jpg')
    }
  }
);

var upload = multer( { storage: storage } );

// call scanner API
router.post('/', upload.single('file'), scanner.scan);
router.get('/', scanner.scan);

module.exports = router;
