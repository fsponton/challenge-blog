import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { validateUser } from "../middlewares/validateUserCreate";
import asyncHandler from "../middlewares/asyncHandler";
const router = Router();

router.post("/register", validateUser, asyncHandler(AuthController.register));
router.post("/login", asyncHandler(AuthController.signin));

export default router;