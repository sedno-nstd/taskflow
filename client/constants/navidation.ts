import {
  Calendar,
  CheckSquare,
  FolderKanban,
  LayoutDashboard,
} from "lucide-react";
import { APP_ROUTES } from "./route";

export const NAVIGATION = [
  {
    label: "Dashboard",
    href: APP_ROUTES.HOME,
    icon: LayoutDashboard,
  },
  {
    label: "Projects",
    href: APP_ROUTES.NAVIGATION.PROJECTS,
    icon: FolderKanban,
  },
  {
    label: "My tasks",
    href: APP_ROUTES.NAVIGATION.MY_TASKS,
    icon: CheckSquare,
  },
  {
    label: "Calendar",
    href: APP_ROUTES.NAVIGATION.CALENDAR,
    icon: Calendar,
  },
];
