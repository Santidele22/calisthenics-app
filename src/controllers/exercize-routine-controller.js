import Exercize_Routine_Models from "../models/mysql/exercizes-routine-models.js";
export default class Exercize_routine_controller {
  static async getAll(req, res) {
    try {
      const result = await Exercize_Routine_Models.getAll();
      res.json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async create(req, res) {
    try {
      const { id_routine, id_exercize } = req.body;
      const result = await Exercize_Routine_Models.create({
        input: { id_routine, id_exercize },
      });
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json("Error al crear la asociacion");
    }
  }
  static async delete(req, res) {
    try {
      const { id_exercize, id_routine } = req.params;
      if (id_exercize && id_routine) {
        const result = await Exercize_Routine_Models.delete({
          id_exercize: id_exercize,
          id_routine: id_routine,
        });
        res.status(204).json(result);
      }
      res.status(404).json("Exercize not Found");
    } catch (error) {}
  }
}
