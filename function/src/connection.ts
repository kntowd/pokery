import { Sequelize } from "sequelize";

const dbClient = new Sequelize("pokery", "root", "Kenta223", {
  host: "localhost",
  dialect: "mysql",
});

export default dbClient;
