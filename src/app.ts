import express from "express";
import type { Request, Response } from "express";
import routes from "./routes";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", routes);

app.get("/", (req: Request, res: Response) => {
	try {
		res.status(200).json({ message: "Hello, World!" });
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});