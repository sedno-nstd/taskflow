"use client";
import { APP_ROUTES } from "@/constants/route";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.user";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import Link from "next/link";

interface AuthFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  type: "register" | "login";
}

export function AuthForm({ type, ...props }: AuthFormProps) {
  const setAuth = useAuthStore((state) => state.setAuth);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isRegister = type === "register";

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const data = isRegister
        ? await authService.register(formData)
        : await authService.login({
            email: formData.email,
            password: formData.password,
          });

      setAuth(data.user, data.token);
      setIsLoading(false);
      router.push(APP_ROUTES.HOME);
    } catch (err) {
      console.log(err);
      setError("");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full max-w-md rounded-lg shadow-lg">
      <h1 className="mb-6 text-2xl font-semibold text-gray-900">
        {isRegister ? "Register" : "Login"}
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" {...props}>
        {isRegister && (
          <Input
            name="name"
            label="name"
            required
            placeholder="Alex"
            value={formData.name}
            onChange={handleChange}
            error={error}
          />
        )}

        <Input
          name="email"
          label="email"
          required
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          error={error}
        />
        <Input
          name="password"
          label="password"
          required
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          error={error}
        />

        <Button variant="primary" disabled={isLoading}>
          {isLoading ? "Loading..." : isRegister ? "Register" : "Login"}
        </Button>

        <p className="mt-4 text-center text-sm text-zinc-400">
          {isRegister ? "Already have an account?" : "Haven't account?"}{" "}
          <Link
            href={isRegister ? APP_ROUTES.LOGIN : APP_ROUTES.REGISTER}
            className="text-blue-400 hover:underline"
          >
            {isRegister ? "Login" : "Register"}
          </Link>
        </p>
      </form>
    </div>
  );
}
