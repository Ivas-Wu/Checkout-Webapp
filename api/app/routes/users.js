const express = require('express');
const router = express.Router();
const user = require('../controllers/user.controller');

// /api/receipt: GET, POST
// /api/receipt/:id: GET, PUT, DELETE
// /api/receipt/active: GET

// create a user
router.post("/", create);

// get all users
router.get("/", findAll);

// get all active users
router.get("/active", findAllActive);

// get one user
router.get("/:id", findOne);

// update a user
router.put("/:id", update);

// delete a user
router.delete("/:id", deleteOne);

module.exports = router;
