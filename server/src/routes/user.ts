import { Request, Response, Router } from "express";
import { prisma } from "../lib/prisma";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/registration", async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Email and name are required" });
    }

    const existUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existUser) {
      return res.status(409).json({ message: "User already exist" });
    }

    const user = await prisma.user.create({
      data: {
        email: email,
        name: String(name),
      },
    });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" },
    );

    return res.status(201).json({ user: user, token: token });
  } catch (err) {
    return res.status(500).json({ message: "Failed to register" });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return res.status(401).json({ message: "User does not exist" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" },
    );

    return res.status(200).json({ token: token, user: user });
  } catch (err) {
    return res.status(500).json({ message: "Failed to log in" });
  }
});

export default router;
