import { Router } from "express";
import { authController } from "../controllers/auht.controller";
import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { uploadAvatar } from "../middlewares/upload.middleware";

const userRouter = Router();

userRouter.patch(
  "/avatar",
  authMiddleware,
  uploadAvatar.single("avatar"),
  userController.updateAvatar,
);

export default userRouter;
