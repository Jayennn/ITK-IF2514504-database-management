import {
   cancelOrderHandler,
   checkoutOrderHandler,
   index,
   show,
} from "@controllers/orders.controller";
import { authenticate } from "@middlewares/auth.middleware";
import { authorize } from "@middlewares/rbac.middleware";
import { Router } from "express";

const router = Router();

router.get("/", authenticate, index);
router.get("/:id", authenticate, show);
router.post("/", authenticate, authorize("customer"), checkoutOrderHandler);
router.delete("/:id", authenticate, cancelOrderHandler);

// router.get("/me", authenticate, authorize("customer"), myOrders);
export default router;
