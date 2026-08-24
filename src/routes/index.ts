import { Router } from "express";
import auth from "./auth.route";
import books from "./books.route";

const router = Router();

router.use("/books", books);
router.use("/auth", auth);

export default router;
