import { Router } from "express";
import auth from "./auth.route";
import books from "./books.route";
import orders from "./orders.route";

const router = Router();

router.use("/books", books);
router.use("/orders", orders);
router.use("/auth", auth);

export default router;
