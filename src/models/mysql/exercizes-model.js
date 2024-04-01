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

export default class ExercizesModel {
  static async getAll({ name }) {
    if (name) {
      try {
        const lowerName = name.toLowerCase();
        const [exercize] = await con.query(
          "SELECT BIN_TO_UUID(exercizes.id_exercizes) AS id_exercizes,exercizes.name, exercizes.difficulty FROM exercizes",
          [lowerName]
        );
        return exercize;
      } catch (error) {
        console.log(error);
        throw new Error({ Error: error });
      }
    }
    try {
      const [exercizes] = await con.query(
        "SELECT BIN_TO_UUID(exercizes.id_exercizes) AS id_exercizes,exercizes.name, exercizes.difficulty FROM exercizes"
      );
      return exercizes;
    } catch (error) {
      console.log(error);
      throw new Error({ Error: error });
    }
  }
  static async getById({ id }) {
    const [exercize] = await con.query(
      "SELECT BIN_TO_UUID(exercizes.id_exercizes) AS id_exercizes, BIN_TO_UUID(exercizes.id_routine) AS id_routine,exercizes.name, exercizes.difficulty, routine.name AS routine_name FROM exercizes LEFT JOIN routine ON exercizes.id_routine = routine.id_routine WHERE id_exercizes = UUID_TO_BIN(?);",
      [id]
    );
    return exercize;
  }
  static async create({ input }) {
    const { name, difficulty } = input.data;
    const [uuidResult] = await con.query("SELECT UUID() uuid");
    const [{ uuid }] = uuidResult;
    try {
      await con.query(
        "INSERT INTO exercizes (id_exercizes, name, difficulty) VALUES (UUID_TO_BIN(?), ?, ?);",
        [uuid, name, difficulty]
      );
    } catch (error) {
      console.log(error);
      throw new Error("Error creating exercize", error);
    }

    const [exercize] = await con.query(
      "SELECT BIN_TO_UUID(exercizes.id_exercizes) AS id_exercizes, exercizes.name, exercizes.difficulty FROM exercizes"
    );

    return exercize[0];
  }

  static async update({ id, input }) {
    const { name, difficulty } = input.data;
    const [existingExercize] = await con.query(
      "SELECT name, difficulty FROM exercizes WHERE id_exercizes = UUID_TO_BIN(?);",
      [id]
    );

    const updatedName = name || existingExercize[0].name;
    const updatedDifficulty = difficulty || existingExercize[0].difficulty;

    const [exercize] = await con.query(
      "UPDATE exercizes SET name = ?, difficulty = ? WHERE id_exercizes = UUID_TO_BIN(?);",
      [updatedName, updatedDifficulty, id]
    );
    return exercize[0];
  }
  static async delete({ id }) {
    const [exercize] = await con.query(
      "DELETE FROM exercizes WHERE id_exercizes = UUID_TO_BIN(?);",
      [id]
    );
    return exercize;
  }
}
