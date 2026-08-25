import { checkoutOrder, index, myOrders, show } from "@controllers/orders.controller";
import { authenticate } from "@middlewares/auth.middleware";
import { authorize } from "@middlewares/rbac.middleware";
import { Router } from "express";

const router = Router();

router.get("/me", authenticate, authorize("customer"), myOrders);
router.post("/", authenticate, authorize("customer"), checkoutOrder);

router.get("/", authenticate, authorize("admin"), index);
router.get("/:id", authenticate, authorize("admin", "customer"), show);

export default router;
