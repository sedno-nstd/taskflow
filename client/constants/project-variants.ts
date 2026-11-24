import { FileText, History, Kanban, Layers } from "lucide-react";

export const PROJECT_VARIANTS = [
  { value: "board", label: "Board", icon: Kanban },
  { value: "list", label: "List", icon: Layers },
  { value: "activity", label: "Activity", icon: History },
  { value: "files", label: "Files", icon: FileText },
] as const;

export type ProjectVariant = (typeof PROJECT_VARIANTS)[number]["value"];
