import { TaskPriority, TaskStatus } from "@/types/task";

export const PRIORITY_CONFIG: Record<
  TaskPriority,
  { label: string; className: string }
> = {
  LOW: {
    label: "Low",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
  },
  MEDIUM: {
    label: "Medium",
    className: "bg-amber-50 text-amber-700 border-amber-200/80",
  },
  HIGH: {
    label: "High",
    className: "bg-red-200 text-rose-700 border-rose-200/80",
  },
};

export const STATUS_CONFIG: Record<
  TaskStatus,
  { label: string; badgeClass: string; dotClass: string }
> = {
  TODO: {
    label: "To Do",
    badgeClass: "bg-slate-100 text-slate-700",
    dotClass: "bg-slate-400",
  },
  IN_PROGRESS: {
    label: "In Progress",
    badgeClass: "bg-blue-50 text-blue-700",
    dotClass: "bg-blue-500",
  },
  DONE: {
    label: "Done",
    badgeClass: "bg-emerald-50 text-emerald-700",
    dotClass: "bg-emerald-500",
  },
};

export function getPriorityBadge(priority: TaskPriority) {
  return PRIORITY_CONFIG[priority] ?? PRIORITY_CONFIG.MEDIUM;
}
