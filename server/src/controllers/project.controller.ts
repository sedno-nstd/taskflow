import { NextFunction, Request, Response } from "express";
import { projectService } from "../services/project.service";
import { getUserId } from "../lib/getUserId";

export class ProjectController {
  async createProject(req: Request, res: Response, next: NextFunction) {
    try {
      const { projectName, description } = req.body;

      const ownerId = getUserId(req);

      const project = await projectService.createProject(
        projectName,
        ownerId,
        description,
      );

      return res.status(201).json({ project });
    } catch (err) {
      next(err);
    }
  }

  async getProjectById(req: Request, res: Response, next: NextFunction) {
    try {
      const projectId = req.params.id as string;

      const ownerId = getUserId(req);

      const project = await projectService.getProjectById(projectId, ownerId);

      return res.status(200).json({ project });
    } catch (err) {
      next(err);
    }
  }

  async getAllProjects(req: Request, res: Response, next: NextFunction) {
    try {
      const ownerId = getUserId(req);

      const projects = await projectService.getAllProjects(ownerId);

      return res.status(200).json({ projects });
    } catch (err) {
      next(err);
    }
  }

  async updateProject(req: Request, res: Response, next: NextFunction) {
    try {
      const projectId = req.params.id as string;
      const { newName, newDescription } = req.body;

      const ownerId = getUserId(req);

      const project = await projectService.updateProject(
        projectId,
        ownerId,
        newName,
        newDescription,
      );

      return res.status(200).json({ project });
    } catch (err) {
      next(err);
    }
  }

  async deleteProject(req: Request, res: Response, next: NextFunction) {
    try {
      const projectId = req.params.id as string;

      const ownerId = getUserId(req);

      const project = await projectService.deleteProjectById(
        projectId,
        ownerId,
      );

      return res.status(204).json({ message: "Project deleted successfully" });
    } catch (err) {
      next(err);
    }
  }
}

export const projectController = new ProjectController();
