import { useAuthStore } from "@/store/auth.user";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch<T>(
  endPoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = useAuthStore.getState().token;

  const isFormData = options.body instanceof FormData;

  const response = await fetch(`${API_URL}${endPoint}`, {
    ...options,
    headers: {
      ...(!isFormData && { "Content-Type": "application/json" }),
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  const data = response.status === 204 ? null : await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Something went wrong");
  }

  return data as T;
}
