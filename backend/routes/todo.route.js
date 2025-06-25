import express from "express";

import validateUser from "../middleware/auth.middleware.js";

import {
  getTodos,
  postTodo,
  deleteTodo,
  updateTodo,
} from "../controllers/todo.controller.js";

const router = express.Router();

router.get("/", validateUser, getTodos);
router.post("/", validateUser, postTodo);
router.delete("/:id", validateUser, deleteTodo);
router.post("/:id", validateUser, updateTodo);
export default router;
