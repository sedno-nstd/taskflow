import { Router } from "express";
import authRouter from "./auth.routes";
import userRouter from "./user.route";
import taskRouter from "./task.route";
import { projectRoutes } from "./project.route";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/tasks", taskRouter);
router.use("/projects", projectRoutes);

export default router;
