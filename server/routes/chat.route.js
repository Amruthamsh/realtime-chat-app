import {
  getChat,
  getUserChats,
  createChat,
} from "../controllers/chat.controller.js";

import express from "express";

const router = express.Router();

router.post("/", createChat);
router.get("/:userId", getUserChats);
router.get("/find/:firstId/:secondId", getChat);

export default router;
