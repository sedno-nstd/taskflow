import { Task } from "@/types/task";
import { EmptyState } from "../ui/EmptyState";
import { TASK_COLUMNS } from "@/constants/task-statuses";
import { TaskCard } from "./TaskCard";
import { useGroupedTasks } from "@/hooks/useGroupedTasks";

export function TaskBoard({ tasks }: { tasks: Task[] }) {
  const groupedTask = useGroupedTasks(tasks);

  if (tasks.length === 0) return <EmptyState title="Sasks not found" />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 h-full">
      {TASK_COLUMNS.map((col) => {
        const items = groupedTask[col.status];

        return (
          <section
            key={col.status}
            className="flex flex-col rounded-2xl bg-gray-50/80 p-4 border border-gray-200/70"
          >
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${col.dot}`} />
                <h3 className="text-sm font-semibold text-gray-800">
                  {col.label}
                </h3>
              </div>
              <span className="rounded-full bg-gray-200/70 px-2 py-0.5 text-xs font-medium text-gray-600">
                {items.length}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {items.length === 0 ? (
                <div className="flex h-24 items-center justify-center rounded-xl border border-dashed border-gray-200 text-xs text-gray-400">
                  No tasks
                </div>
              ) : (
                items.map((task) => <TaskCard key={task.id} task={task} />)
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
