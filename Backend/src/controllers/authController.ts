import { json, Request, Response } from "express";
import Prisma from "../prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const Register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    console.log(username, email, password);

    if (!username || !email || !password) {
        res.status(400).json({ message: "Please fill in all fields" });
        return;
    }

    if (password.length < 6) {
        res.status(400).json({ message: "Password must be at least 6 characters"}); 
        return;
    }

    try {
        const ExistingUser = await Prisma.user.findUnique({ where: { email } });
        if (ExistingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const NewUser = await Prisma.user.create({ 
            data: { username: username, email, password: hashedPassword }
        });

        const token = jwt.sign(
            { id: NewUser.id, email: NewUser.email }, 
            process.env.JWT_KEY as string, 
            { expiresIn: "1h" }
        );

        res.status(201).json({
            message: "New User created successfully",
            user: { id: NewUser.id, username: NewUser.username, email: NewUser.email },
            token 
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
}

export const Login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: "Please fill in all fields" });
        return;
    }

    try {
        const ExistingUser = await Prisma.user.findUnique({ where: { email }});
        if (!ExistingUser) {
            res.status(404).json({ message: "No user found with this email" });
            return;
        }

        const isMatch = await bcrypt.compare(password, ExistingUser.password);
        if (!isMatch) {
            res.status(401).json({ message: "Invalid password"});
        }

        const token = jwt.sign(
            { id: ExistingUser.id, email: ExistingUser.email },
            process.env.JWT_KEY as string,
            { expiresIn: "1h" }
        );
        
        res.status(200).json({
            message: "User logged in successfully",
            user: { id: ExistingUser.id, username: ExistingUser.username, email: ExistingUser.email },
            token
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
}

export const DeleteAccount = async (req: Request, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    try {
        const ExistingUser = await Prisma.user.findUnique({ where: { id: userId } });
        if (!ExistingUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        await Prisma.user.delete({ where: { id: userId } });

        res.status(200).json({ message: "Account deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};