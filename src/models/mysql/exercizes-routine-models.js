import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const { DB_PASSWORD, DB_NAME } = process.env;

const config = {
  host: "localhost",
  user: "root",
  port: 3306,
  password: DB_PASSWORD,
  database: DB_NAME,
};
const con = await mysql.createConnection(config);
export default class Exercize_Routine_Models {
  static async getAll() {
    try {
      const [res] = await con.query("SELECT * FROM exercizes_routines ");
      return res[0];
    } catch (error) {
      throw new Error({ Error: error });
    }
  }
  static async create({ input }) {
    const { id_routine, id_exercize } = input;
    try {
      await con.query(
        "INSERT INTO exercizes_routines (id_exercizes, id_routine) VALUE(UUID_TO_BIN(?),UUID_TO_BIN(?))",
        [id_exercize, id_routine]
      );
    } catch (error) {
      throw new Error("Error al crear el ejercicio");
    }
  }
  static async delete({ id_exercize, id_routine }) {
    try {
      const [result] = await con.query(
        "DELETE FROM exercizes_routines WHERE id_exercizes = UUID_TO_BIN(?) AND id_routine = UUID_TO_BIN(?);",
        [id_exercize, id_routine]
      );
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}
