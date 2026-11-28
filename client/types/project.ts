import { Task, TaskStatus } from "./task";

export interface Project {
  id: string;
  name: string;
  description: string | null;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  task?: Task[];
}

export interface UpdateProjectDto {
  title?: string;
  description?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
  assigneeId?: string;
}

export interface CreateProjectDto {
  projectName: string;
  description?: string;
}
