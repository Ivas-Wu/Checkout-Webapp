const express = require("express");
const router = express.Router();
const goal = require("../controllers/goal.controller");

// /api/blog: GET, POST
// /api/blog/:id: GET, PUT, DELETE

// create a goal
router.post("/", create);

// get all goals
router.get("/", findAll);

// get one goal
router.get("/:id", findOne);

// update a goal
router.put("/:id", update);

// delete a goal
router.delete("/:id", deleteOne);

module.exports = router;
