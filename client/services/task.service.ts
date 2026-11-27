import { API_ROUTES } from "@/constants/route";
import { apiFetch } from "@/lib/api";
import { Task, TaskPriority, TaskStatus } from "@/types/task";

interface CreateTaskDto {
  projectId: string;
  title: string;
  description?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
  assigneeId?: string;
}

interface UpdateTaskDto {
  title?: string;
  description?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
  assigneeId?: string;
}

export const taskService = {
  async getAllTasks() {
    const data = await apiFetch<{ tasks: Task[] }>(API_ROUTES.TASKS.BASE);

    return data.tasks || [];
  },

  async getTaskById(id: string) {
    const data = await apiFetch<{ task: Task }>(API_ROUTES.TASKS.BY_ID(id));

    return data.task;
  },

  async createTask(dto: CreateTaskDto) {
    const data = await apiFetch<{ task: Task }>(API_ROUTES.TASKS.BASE, {
      method: "POST",
      body: JSON.stringify(dto),
    });

    return data.task;
  },

  async updateTask(id: string, dto: UpdateTaskDto): Promise<Task> {
    const data = await apiFetch<{ task: Task }>(API_ROUTES.TASKS.BY_ID(id), {
      method: "PATCH",
      body: JSON.stringify(dto),
    });

    return data.task;
  },

  async deleteTask(id: string) {
    await apiFetch(API_ROUTES.TASKS.BY_ID(id), {
      method: "DELETE",
    });
  },
};
