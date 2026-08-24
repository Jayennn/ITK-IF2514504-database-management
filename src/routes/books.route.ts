import {
	create,
	destroy,
	index,
	show,
	update,
} from "@controllers/books.controller";
import { authenticate } from "@middlewares/auth.middleware";
import { authorize } from "@middlewares/rbac.middleware";
import { Router } from "express";

const router = Router();

router.get("/", index);
router.get("/:id", show);

// Admin-only endpoints
router.post("/", authenticate, authorize("admin"), create);
router.put("/:id", authenticate, authorize("admin"), update);
router.delete("/:id", authenticate, authorize("admin"), destroy);

export default router;
