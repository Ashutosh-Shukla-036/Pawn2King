import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute";

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
    res.status(200).send("Backend is Up.... and running");
});

app.use("/api/auth", authRoute); 

const PORT = process.env.PORT || 5432;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
