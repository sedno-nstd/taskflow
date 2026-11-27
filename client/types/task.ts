export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

export interface TaskUser {
  id: string;
  name: string | null;
  email: string;
  avatar?: string | null;
}

export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  projectId: string;
  creatorId: string;
  assigneeId: string | null;
  creator?: TaskUser;
  assignee?: TaskUser | null;
  createdAt: string;
  updatedAt: string;
}
