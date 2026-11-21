import { API_ROUTES } from "@/constants/route";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface RegisterProps {
  name: string;
  email: string;
  password: string;
}

interface LoginProps {
  email: string;
  password: string;
}

async function sendAuthRequest(
  endpoint: string,
  payload: RegisterProps | LoginProps,
) {
  const result = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await result.json();

  if (!result.ok) throw new Error(data.message || "Something went wrong");

  return data;
}

export const authService = {
  login: (payload: LoginProps) =>
    sendAuthRequest(API_ROUTES.AUTH.LOGIN, payload),

  register: (payload: RegisterProps) =>
    sendAuthRequest(API_ROUTES.AUTH.REGISTER, payload),
};
