import { NextFunction, Request, Response } from "express";
import { taskService } from "../services/task.service";
import { getUserId } from "../lib/getUserId";

export class TaskController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = getUserId(req);
      const task = await taskService.getAllTasks(userId);

      return res.status(200).json({ task });
    } catch (err) {
      next(err);
    }
  }

  async getByProject(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = getUserId(req);
      const { projectId } = req.params;
      const task = await taskService.getProjectTasks(
        userId,
        projectId as string,
      );

      return res.status(200).json({ task });
    } catch (err) {
      next(err);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = getUserId(req);
      const { id } = req.params;
      const task = await taskService.getTaskById(userId, id as string);

      return res.status(200).json({ task });
    } catch (err) {
      next(err);
    }
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const creatorId = getUserId(req);
      const { title, description, status, priority, assigneeId } = req.body;

      const { projectId } = req.params as { projectId: string };

      const task = await taskService.createTask({
        creatorId,
        projectId,
        title,
        assigneeId,
        description,
        priority,
        status,
      });

      return res.status(201).json({ task });
    } catch (err) {
      next(err);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = getUserId(req);

      const { id } = req.params;

      const task = await taskService.updateTask(userId, id as string, req.body);

      return res.status(200).json({ task });
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = getUserId(req);
      await taskService.deleteTask(userId, id as string);

      return res.status(200).json({ message: "Task deleted" });
    } catch (err) {
      next(err);
    }
  }
}

export const taskController = new TaskController();
