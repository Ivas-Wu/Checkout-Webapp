const express = require("express");
const router = express.Router();
const goal = require("../controllers/goal.controller");

// /api/blog: GET, POST
// /api/blog/:id: GET, PUT, DELETE

// create a goal
router.post("/", goal.create);

// get all goals
router.get("/", goal.findAll);

// get one goal
router.get("/:id", goal.findOne);

// update a goal
router.put("/:id", goal.update);

// delete a goal
router.delete("/:id", goal.delete);

module.exports = router;
