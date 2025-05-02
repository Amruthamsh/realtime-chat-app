import {
  createMessage,
  getMessages,
} from "../controllers/message.controller.js";

import express from "express";

const router = express.Router();

router.post("/", createMessage);
router.get("/:chatId", getMessages);
export default router;
