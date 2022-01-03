import { Sequelize } from "sequelize";

export const dbClient = new Sequelize("pokery", "root", "Kenta223", {
  host: "localhost",
  dialect: "mysql",
});
