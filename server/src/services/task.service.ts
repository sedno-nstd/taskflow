import { TaskPriority, TaskStatus } from "@prisma/client";
import { ApiError } from "../lib/ApiError";
import { prisma } from "../lib/prisma";

interface TaskProps {
  projectId: string;
  creatorId: string;
  assigneeId?: string;
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
}

interface UpdateTaskDto {
  title?: string;
  description?: string | null;
  status?: TaskStatus;
  priority?: TaskPriority;
  assigneeId?: string | null;
}

const userSelect = {
  id: true,
  name: true,
  avatar: true,
  email: true,
  role: true,
} as const;

export class TaskService {
  private async verifyProjectAccess(userId: string, projectId: string) {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        task: {
          where: { assigneeId: userId },
          take: 1,
        },
      },
    });

    if (!project) {
      throw ApiError.notFound("Project not found");
    }

    const isOwner = project.ownerId === userId;
    const isAssigneeInProject = project.task.length > 0;

    if (!isOwner && !isAssigneeInProject) {
      throw ApiError.forbidden("You don't have access to this project");
    }

    return { project, isOwner };
  }

  private async verifyTaskAccess(userId: string, taskId: string) {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
      include: {
        project: true,
        creator: { select: userSelect },
        assignee: { select: userSelect },
      },
    });

    if (!task) {
      throw ApiError.notFound("Task not found");
    }

    const isOwner =
      userId === task.creatorId || task.project.ownerId === userId;
    const isAssignee = userId === task.assigneeId;

    if (!isOwner && !isAssignee) {
      throw ApiError.forbidden("You don't have access to this task");
    }

    return { task, isOwner, isAssignee };
  }
  async createTask({
    priority,
    projectId,
    creatorId,
    description,
    status,
    title,
    assigneeId,
  }: TaskProps) {
    if (!title?.trim()) {
      throw ApiError.badRequest("Fields are required");
    }

    const { isOwner } = await this.verifyProjectAccess(creatorId, projectId);

    if (!isOwner) {
      throw ApiError.forbidden("Only project owner can create tasks");
    }

    if (assigneeId) {
      const assignee = await prisma.user.findUnique({
        where: { id: assigneeId },
      });
      if (!assignee) {
        throw ApiError.notFound("Assignee user not found");
      }
    }

    const task = await prisma.task.create({
      data: {
        title: title.trim(),
        description: description?.trim() || null,
        priority: priority || "MEDIUM",
        status: status || "TODO",
        assigneeId: assigneeId || null,
        projectId,
        creatorId,
      },
      include: {
        creator: { select: userSelect },
        assignee: { select: userSelect },
      },
    });

    return task;
  }

  async updateTask(userId: string, taskId: string, dto: UpdateTaskDto) {
    const { task, isOwner } = await this.verifyTaskAccess(userId, taskId);

    if (!isOwner) {
      const triesToEditOwnerFields =
        dto.title !== undefined ||
        dto.description !== undefined ||
        dto.priority !== undefined ||
        dto.assigneeId !== undefined;

      if (triesToEditOwnerFields) {
        throw ApiError.forbidden("You don't have access to update this task");
      }
    }

    const updateData: UpdateTaskDto = {};

    if (dto.title?.trim() !== undefined) {
      if (!dto.title.trim()) throw ApiError.badRequest("Title cannot be empty");
      if (dto.title.trim() !== task.title) updateData.title = dto.title.trim();
    }

    if (dto.description !== undefined) {
      const desc = dto.description?.trim() || null;
      if (desc !== task.description) updateData.description = desc;
    }

    if (dto.priority !== undefined) {
      if (!dto.priority) throw ApiError.badRequest("Priority cannot be empty");
      if (dto.priority !== task.priority) updateData.priority = dto.priority;
    }

    if (dto.status !== undefined) {
      if (!dto.status) throw ApiError.badRequest("Status cannot be empty");
      if (dto.status !== task.status) updateData.status = dto.status;
    }

    if (dto.assigneeId !== undefined && dto.assigneeId !== task.assigneeId) {
      if (dto.assigneeId !== null) {
        const userExist = await prisma.user.findUnique({
          where: { id: dto.assigneeId as string },
        });

        if (!userExist) throw ApiError.notFound("Assignee user not found");
      }
      updateData.assigneeId = dto.assigneeId;
    }

    if (Object.keys(updateData).length === 0) {
      return task;
    }

    return await prisma.task.update({
      where: { id: taskId },
      data: updateData,
      include: {
        creator: { select: userSelect },
        assignee: { select: userSelect },
      },
    });
  }

  async deleteTask(userId: string, taskId: string) {
    const { isOwner } = await this.verifyTaskAccess(userId, taskId);

    if (!isOwner) {
      throw ApiError.forbidden("You don't have access to delete task");
    }

    await prisma.task.delete({
      where: { id: taskId },
    });
  }

  async getAllTasks(userId: string) {
    return prisma.task.findMany({
      where: {
        OR: [
          { assigneeId: userId },
          { creatorId: userId },
          { project: { ownerId: userId } },
        ],
      },
      include: {
        project: { select: { id: true, name: true } },
        creator: { select: userSelect },
        assignee: { select: userSelect },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async getTaskById(userId: string, taskId: string) {
    const { task } = await this.verifyTaskAccess(userId, taskId);
    return task;
  }

  async getProjectTasks(userId: string, projectId: string) {
    if (!projectId) {
      throw ApiError.notFound("Project not found");
    }

    await this.verifyProjectAccess(userId, projectId);

    return prisma.task.findMany({
      where: { projectId },
      include: {
        creator: { select: userSelect },
        assignee: { select: userSelect },
      },
      orderBy: { createdAt: "desc" },
    });
  }
}

export const taskService = new TaskService();
