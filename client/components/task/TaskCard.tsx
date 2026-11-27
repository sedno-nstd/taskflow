import { Task } from "@/types/task";
import { Calendar } from "lucide-react";
import { UserAvatar } from "../ui/UserAvatar";
import { getPriorityBadge } from "@/constants/task-styles";

export function TaskCard({ task }: { task: Task }) {
  const priorityBadge = getPriorityBadge(task.priority);
  const formattedDate = new Date(task.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  return (
    <article className="flex flex-col rounded-lg bg-white p-4 w-full">
      <div className="flex flex-row w-full justify-between items-center">
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Calendar className="h-3.5 w-3.5" />
          <span>{formattedDate}</span>
        </div>

        <span
          className={`rounded-md border px-2 py-0.5 text-xs font-medium ${priorityBadge.className}`}
        >
          {priorityBadge.label}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-semibold text-gray-900 wrap-break-word">
          {task.title}
        </h3>
        {task.description && (
          <p className="text-xs font-normal text-gray-500 line-clamp-2 wrap-break-word">
            {task.description}
          </p>
        )}
      </div>
      <div className="flex flex-row mt-6">
        <UserAvatar
          avatar={task.creator?.avatar}
          name={task.creator?.name}
          size="md"
        />
        <UserAvatar
          avatar={task.assignee?.avatar}
          name={task.assignee?.name}
          size="md"
        />
      </div>
    </article>
  );
}
