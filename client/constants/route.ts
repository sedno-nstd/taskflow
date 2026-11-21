export const APP_ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  NAVIGATION: {
    PROJECTS: "/projects",
    MY_TASKS: "/tasks",
    CALENDAR: "calendar",
  },
} as const;

export const API_ROUTES = {
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
  },
} as const;
