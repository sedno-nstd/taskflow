import { Task, TaskStatus } from "@/types/task";
import { useMemo } from "react";

export function useGroupedTasks(tasks: Task[] = []) {
  return useMemo(() => {
    const map: Record<TaskStatus, Task[]> = {
      TODO: [],
      IN_PROGRESS: [],
      DONE: [],
    };

    for (const task of tasks) {
      map[task.status]?.push(task);
    }

    return map;
  }, [tasks]);
}
