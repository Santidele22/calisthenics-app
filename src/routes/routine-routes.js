import { Router } from "express";
import routinesController from "../controllers/routines-controller.js";

const router = Router();

router.get("/", routinesController.getAllRoutines);
router.get("/:id", routinesController.getRoutine);
router.post("/", routinesController.createRoutine);
router.delete("/:id", routinesController.deleteRoutine);
router.patch("/:id", routinesController.updateRoutine);
export default router;
