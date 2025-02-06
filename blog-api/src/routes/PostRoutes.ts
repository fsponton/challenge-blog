import { Router } from "express";
import { PostController } from "../controllers/PostControllers"
import { validatePostCreate } from "../middlewares/validatePostCreate";
import { validateToken } from "../middlewares/validateToken";
import asyncHandler from "../middlewares/asyncHandler";

const router = Router();

router.post("/", validateToken, asyncHandler(PostController.getAll));
router.post("/create", validateToken, validatePostCreate, asyncHandler(PostController.create));
router.post("/edit/:id", validateToken, asyncHandler(PostController.edit));
router.post("/delete/:id", validateToken, asyncHandler(PostController.deleteById));

export default router;


