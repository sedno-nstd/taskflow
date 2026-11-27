import { TaskStatus } from "@/types/task";

export const TASK_COLUMNS: {
  status: TaskStatus;
  label: string;
  dot: string;
}[] = [
  { status: "TODO", label: "To Do", dot: "bg-gray-400" },
  { status: "IN_PROGRESS", label: "In Progress", dot: "bg-orange-400" },
  { status: "DONE", label: "Done", dot: "bg-emerald-500" },
];
