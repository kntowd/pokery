import { Sequelize } from "sequelize";
import runtimeConfig from "../config/functionsConfig";

const dbClient = new Sequelize(
  runtimeConfig.dbName,
  runtimeConfig.user,
  runtimeConfig.password,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

export default dbClient;
