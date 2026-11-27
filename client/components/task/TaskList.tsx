import { Task } from "@/types/task";
import { EmptyState } from "../ui/EmptyState";
import { TaskCard } from "./TaskCard";
import { TASK_COLUMNS } from "@/constants/task-statuses";
import { STATUS_CONFIG } from "@/constants/task-styles";
import { useGroupedTasks } from "@/hooks/useGroupedTasks";

export function TaskList({ tasks }: { tasks: Task[] }) {
  const groupedTask = useGroupedTasks(tasks);

  if (tasks.length === 0) return <EmptyState title="Tasks not found" />;

  return (
    <div className="flex flex-col gap-2">
      {TASK_COLUMNS.map((col) => {
        const items = groupedTask[col.status];
        if (items.length === 0) return null;
        return (
          <section
            key={col.status}
            className="flex flex-col gap-3 rounded-2xl border border-gray-200/70 bg-gray-50/80 p-4"
          >
            <div className="flex items-center gap-2 px-1">
              <span className={`h-2 w-2 rounded-full ${col.dot}`} />
              <h3 className="text-sm font-semibold text-gray-800">
                {col.label}
              </h3>
              <span className="rounded-full bg-gray-200/70 px-2 py-0.5 text-xs font-medium text-gray-600">
                {items.length}
              </span>
            </div>

            <div className="flex flex-col gap-2.5">
              {items.map((item) => (
                <TaskCard key={item.id} task={item} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
