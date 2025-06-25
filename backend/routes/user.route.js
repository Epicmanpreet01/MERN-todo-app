import express from "express";
import validateUser from "../middleware/auth.middleware.js";
import { getUser, updateUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", validateUser, updateUser);
router.get("/", validateUser, getUser);

export default router;
