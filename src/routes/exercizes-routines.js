import { Router } from "express";
import Exercize_routine_controller from "../controllers/exercize-routine-controller.js";
const router = Router();
router.get("/", Exercize_routine_controller.getAll);
router.post("/", Exercize_routine_controller.create);
router.delete("/:id_exercize/:id_routine", Exercize_routine_controller.delete);

export default router;
