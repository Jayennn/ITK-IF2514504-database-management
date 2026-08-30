import { revenueReport, topSellingBooks } from "@controllers/reports.controller";
import { authenticate } from "@middlewares/auth.middleware";
import { authorize } from "@middlewares/rbac.middleware";
import { Router } from "express";

const router = Router();
router.get("/revenue", authenticate, authorize("admin"), revenueReport);
router.get("/top-selling", authenticate, topSellingBooks);

export default router;
