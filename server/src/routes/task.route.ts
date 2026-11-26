import { Router } from "express";
import { taskController } from "../controllers/task.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.get("/", taskController.getAll);

router.post("/project/:projectId", taskController.create);
router.get("/project/:projectId", taskController.getByProject);

router.get("/:id", taskController.getById);
router.put("/:id", taskController.update);
router.delete("/:id", taskController.delete);
