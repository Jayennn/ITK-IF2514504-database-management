import { Router } from "express";
import booksRouter from "./books.route";

const router = Router();

router.use("/books", booksRouter);

export default router;
