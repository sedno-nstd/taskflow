import jwt from "jsonwebtoken";
import { ApiError } from "../lib/ApiError";
import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";

interface RegisterProps {
  name: string;
  email: string;
  password: string;
}

interface LoginProps {
  email: string;
  password: string;
}

class AuthService {
  private generateToken(userId: string, email: string, role: string) {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw ApiError.internal("JWT Secret is not defined");
    }
    return jwt.sign({ userId, email, role }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });
  }

  async register({ email, name, password }: RegisterProps) {
    if (!name || !email || !password) {
      throw ApiError.badRequest("Field is required");
    }

    const existUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existUser) {
      throw ApiError.conflicts("This user already exist");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    const token = this.generateToken(user.id, user.email, user.role);

    const { password: _, ...safeUser } = user;

    return { user: safeUser, token };
  }

  async login({ email, password }: LoginProps) {
    if (!email || !password) {
      throw ApiError.badRequest("Field is required");
    }

    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      throw ApiError.unauthorized("User does not exist");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw ApiError.unauthorized("Invalid email or password");
    }

    const token = this.generateToken(user.id, user.email, user.role);
    const { password: _, ...safeUser } = user;

    return { user: safeUser, token };
  }
}

export const authService = new AuthService();
