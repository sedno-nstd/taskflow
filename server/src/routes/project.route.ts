import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { projectController } from "../controllers/project.controller";

const router = Router();

router.use(authMiddleware);

router.post("/", projectController.createProject);
router.get("/", projectController.getAllProjects);
router.get("/:id", projectController.getProjectById);
router.delete("/:id", projectController.deleteProject);
router.patch("/:id", projectController.updateProject);

export const projectRoutes = router;
