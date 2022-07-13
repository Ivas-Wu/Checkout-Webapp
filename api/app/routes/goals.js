import { Router } from "express";
const router = Router()
import { create, findAll, findOne, update, deleteOne } from "../controllers/goal.controller";

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

export default router