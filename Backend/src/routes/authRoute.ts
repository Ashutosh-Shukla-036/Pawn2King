import express from "express";
import { DeleteAccount, Login, Register } from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware";
const route = express.Router()

route.post("/register", Register);
route.post("/login", Login);
route.delete("/delete",authMiddleware, DeleteAccount);

export default route;