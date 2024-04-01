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

export default class routineModels {
  static async getAll({ name }) {
    if (name) {
      try {
        const lowerName = name.toLowerCase();
        const [routine] = await con.query(
          "SELECT BIN_TO_UUID(id_routine) id_routine, name,duration,difficulty FROM routine WHERE LOWER(name) = ?;",
          [lowerName]
        );
        return routine;
      } catch (error) {
        throw new Error({ Error: error });
      }
    }
    try {
      const [routine] = await con.query(
        "SELECT BIN_TO_UUID(id_routine) id_routine, name, duration ,difficulty FROM routine;"
      );
      return routine;
    } catch (error) {
      console.log(error);
      throw new Error({ Error: error });
    }
  }
  static async getById({ id }) {
    const [routine] = await con.query(
      "SELECT BIN_TO_UUID(id_routine) id_routine, name, duration ,difficulty FROM routine WHERE id_routine = UUID_TO_BIN(?);",
      [id]
    );
    return routine;
  }
  static async create({ input }) {
    console.log(input);
    const { name, duration, difficulty } = input.data;
    const [uuidResult] = await con.query("SELECT UUID() uuid");
    const [{ uuid }] = uuidResult;
    try {
      await con.query(
        "INSERT INTO routine (id_routine, name , duration ,difficulty ) VALUES (UUID_TO_BIN(?),?,?,?);",
        [uuid, name, duration, difficulty]
      );
    } catch (error) {
      throw new Error(error.message, "Error creating exercize");
    }
    const [routine] = await con.query(
      "SELECT BIN_TO_UUID(id_routine) id_routine, name, duration ,difficulty FROM routine WHERE id_routine = UUID_TO_BIN(?);",
      [uuid]
    );
    return routine[0];
  }
  static async update({ id, input }) {
    const { name, duration, difficulty } = input.data;
    const [existingRoutine] = await con.query(
      "SELECT name,duration ,difficulty FROM routine WHERE id_routine = UUID_TO_BIN(?);",
      [id]
    );

    const updatedName = name || existingRoutine[0].name;
    const updatedDifficulty = difficulty || existingRoutine[0].difficulty;
    const updatedDuration = duration || existingRoutine[0].duration;

    const [routine] = await con.query(
      "UPDATE routine SET name = ?, duration = ? ,difficulty = ? WHERE id_routine = UUID_TO_BIN(?);",
      [updatedName, updatedDuration, updatedDifficulty, id]
    );
    return routine[0];
  }
  static async delete({ id }) {
    const [routine] = await con.query(
      "DELETE FROM routine WHERE id_routine = UUID_TO_BIN(?);",
      [id]
    );
    return routine;
  }
}
