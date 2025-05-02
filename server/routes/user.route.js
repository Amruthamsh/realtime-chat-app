import {
  registerUser,
  loginUser,
  findUser,
  getUsers,
} from "../controllers/user.controller.js";

import express from "express";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/find/:id", findUser);
router.get("/", getUsers);

export default router;
