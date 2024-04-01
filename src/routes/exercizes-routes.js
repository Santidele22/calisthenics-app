import { Router } from "express";
import controller from "../controllers/exercizes-controller.js";

const router = Router();

router.get("/", controller.getAllExercizes);
router.get("/:id", controller.getExercize);
router.post("/", controller.createExercize);
router.patch("/:id", controller.updateExercize);
router.delete("/:id", controller.deleteExercize);

export default router;
