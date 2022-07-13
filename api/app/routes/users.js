import { Router } from "express";
const router = Router()
import { create, findAll, findAllActive, findOne, update, deleteOne } from "../controllers/user.controller";

// /api/blog: GET, POST
// /api/blog/:id: GET, PUT, DELETE
// /api/blog/active: GET

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

export default router