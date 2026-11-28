import { ApiError } from "../lib/ApiError";
import { prisma } from "../lib/prisma";

export class ProjectService {
  async createProject(
    projectName: string,
    ownerId: string,
    description?: string,
  ) {
    if (!projectName?.trim()) {
      throw ApiError.badRequest("Project name is required");
    }

    return prisma.project.create({
      data: {
        name: projectName.trim(),
        description: description?.trim() || null,
        ownerId,
      },
    });
  }

  async getProjectById(projectId: string, ownerId: string) {
    if (!projectId) {
      throw ApiError.badRequest("Project ID is  required");
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        task: {
          include: {
            creator: {
              select: { id: true, name: true, email: true, avatar: true },
            },
            assignee: {
              select: { id: true, name: true, email: true, avatar: true },
            },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!project) {
      throw ApiError.notFound("Project not found");
    }

    if (project.ownerId !== ownerId) {
      throw ApiError.forbidden("You are not the owner of this project");
    }

    return project;
  }

  async getAllProjects(ownerId: string) {
    return prisma.project.findMany({
      where: { ownerId: ownerId },
      orderBy: { createdAt: "desc" },
    });
  }

  async updateProject(
    projectId: string,
    ownerId: string,
    name?: string,
    description?: string,
  ) {
    await this.getProjectById(projectId, ownerId);

    if (name !== undefined && !name.trim()) {
      throw ApiError.badRequest("Project name cannot be empty");
    }

    return prisma.project.update({
      where: { id: projectId },
      data: {
        ...(description !== undefined && {
          description: description?.trim() || null,
        }),
        ...(name !== undefined && {
          name: name.trim(),
        }),
      },
    });
  }

  async deleteProjectById(projectId: string, ownerId: string) {
    const project = await this.getProjectById(projectId, ownerId);

    return prisma.project.delete({
      where: { id: project.id },
    });
  }
}

export const projectService = new ProjectService();
