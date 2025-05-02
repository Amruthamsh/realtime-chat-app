import userRouter from "./user.route.js";
import chatRouter from "./chat.route.js";
import messageRouter from "./messages.route.js";
import express from "express";

const router = express.Router();

router.use("/user", userRouter);
router.use("/chat", chatRouter);
router.use("/message", messageRouter);
export default router;
