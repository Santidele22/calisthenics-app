import ExercizesModel from "../models/mysql/exercizes-model.js";
import {
  validateExercize,
  validatePartialExercize,
} from "../validation/exercize-validation.js";
export default class ExercizeController {
  static async getAllExercizes(req, res) {
    try {
      const { name } = req.query;
      const exercizes = await ExercizesModel.getAll({ name });
      if (exercizes.length === 0) {
        return res.status(404).json({ Error: "No se encontraron ejercicios." });
      }
      return res.json(exercizes);
    } catch (error) {
      console.log(error);
      res.status(500).json({ Error: error });
    }
  }
  static async getExercize(req, res) {
    try {
      const { id } = req.params;
      if (id) {
        const exercize = await ExercizesModel.getById({ id });
        return res.json(exercize);
      }
      res.status(404).json({ Error: "No se encontro ejercicio" });
    } catch (error) {
      res.status(500).json({ Error: error });
    }
  }
  static async createExercize(req, res) {
    try {
      const result = validateExercize(req.body);
      if (!result.success) {
        return res.status(400).json({ Error: result.error });
      }
      const exercize = await ExercizesModel.create({ input: result });
      res.status(201).json(exercize);
    } catch (error) {
      console.log(error);
      res.status(500).json({ Error: error });
    }
  }
  static async updateExercize(req, res) {
    try {
      const { id } = req.params;
      const result = validatePartialExercize(req.body);
      if (!result.success) {
        return res
          .status(400)
          .json({ Error: "Error al actualizar un nuevo ejercicio" });
      }
      await ExercizesModel.update({
        id: id,
        input: result,
      });
      res.status(204).json({ Message: "update exercize" });
    } catch (error) {
      res.status(500).json({ Error: error });
    }
  }
  static async deleteExercize(req, res) {
    try {
      const { id } = req.params;
      if (id) {
        const exercizeDeleted = await ExercizesModel.delete({ id });
        return res
          .status(204)
          .json({ Error: "Exercize deleted", exercizeDeleted });
      }
      res.status(404).json({ Error: "Exercize not found" });
    } catch (error) {
      res.status(500).json({ Error: error });
    }
  }
}
