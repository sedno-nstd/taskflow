export const APP_ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  NAVIGATION: {
    PROJECTS: "/projects",
    MY_TASKS: "/tasks",
    CALENDAR: "/calendar",
  },
} as const;

export const API_ROUTES = {
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
  },
  USERS: {
    UPDATE_AVATAR: "/users/avatar",
  },
  PROJECTS: {
    BASE: "/projects",
    BY_ID: (id: string) => `/projects/${id}`,
  },
  TASKS: {
    BASE: "/tasks",
    BY_ID: (id: string) => `/tasks/${id}`,
  },
} as const;
