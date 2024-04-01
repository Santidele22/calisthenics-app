import RoutineModels from "../models/mysql/routines-models.js";
import {
  validateRoutine,
  validatePartialRoutine,
} from "../validation/routine-validation.js";
export default class ExercizeController {
  static async getAllRoutines(req, res) {
    try {
      const { name } = req.query;
      const routines = await RoutineModels.getAll({ name });
      if (routines.length === 0) {
        return res.status(404).json({ Error: "No se encontraron ejercicios." });
      }
      return res.json(routines);
    } catch (error) {
      console.log(error);
      res.status(500).json({ Error: error });
    }
  }
  static async getRoutine(req, res) {
    try {
      const { id } = req.params;
      if (id) {
        const routine = await RoutineModels.getById({ id });
        return res.json(routine);
      }
      res.status(404).json({ Error: "No se encontro rutina" });
    } catch (error) {
      res.status(500).json({ Error: error });
    }
  }
  static async createRoutine(req, res) {
    try {
      const result = validateRoutine(req.body);
      if (!result.success) {
        return res
          .status(400)
          .json({ Error: "Error al crear un nuevo ejercicio" });
      }
      const routine = await RoutineModels.create({ input: result });
      res.status(201).json(routine);
    } catch (error) {
      res.status(500).json({ Error: error });
    }
  }
  static async updateRoutine(req, res) {
    try {
      const { id } = req.params;
      const result = validatePartialRoutine(req.body);
      if (!result.success) {
        return res
          .status(400)
          .json({ Error: "Error al actualizar una nueva rutina" });
      }
      await RoutineModels.update({
        id: id,
        input: result,
      });
      res.status(204).json({ Message: "update routine" });
    } catch (error) {
      res.status(500).json({ Error: error });
    }
  }
  static async deleteRoutine(req, res) {
    try {
      const { id } = req.params;
      if (id) {
        const routineDeleted = await RoutineModels.delete({ id });
        return res
          .status(204)
          .json({ Error: "Routine deleted", routineDeleted });
      }
      res.status(404).json({ Error: "Routine not found" });
    } catch (error) {
      res.status(500).json({ Error: error });
    }
  }
}
