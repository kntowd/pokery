import { Sequelize } from "sequelize";
import runtimeConfig from "../config/functionsConfig";

const dbClient = new Sequelize(
  runtimeConfig.sql.dbName,
  runtimeConfig.sql.user,
  runtimeConfig.sql.password,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

export default dbClient;
