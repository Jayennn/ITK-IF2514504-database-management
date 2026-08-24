import { index, show } from "@controllers/orders.controller";
import { Router } from "express";

const router = Router();

// admin
router.get("/", index);
router.get("/:id", show);

// user
// router.get("/user/:userId");

export default router;
