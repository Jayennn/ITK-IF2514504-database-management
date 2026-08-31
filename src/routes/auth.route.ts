import { getProfile, login, register } from "@controllers/auth.controller";
import { authenticate } from "@middlewares/auth.middleware";
import { Router } from "express";

const router = Router();

router.post("/register", register);
router.post("/login", login);

// Protected endpoints
router.get("/profile", authenticate, getProfile);
// router.post("/logout", authenticate, logout);

export default router;
