import { Router } from "express";
import books from "./books.route";
import auth from "./auth.route";

const router = Router();

router.use("/books", books);
router.use("/auth", auth);

export default router;
