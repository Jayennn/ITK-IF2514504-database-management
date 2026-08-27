import { Router } from "express";
import auth from "./auth.route";
import books from "./books.route";
import orders from "./orders.route";
import reports from "./reports.route";

const router = Router();

router.use("/books", books);
router.use("/auth", auth);
router.use("/orders", orders);
router.use("/reports", reports);

export default router;
