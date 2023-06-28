import { Router } from "express";
import { login, verifyToken, logout } from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", login);
router.get("/verify", verifyToken);
router.post("/logout", logout);

export default router;
