import { ApiClient } from "~/repository/ApiClient";
import { UsersRepository } from "~/repository/UsersRepository";

const environment = process.env.NODE_ENV || "development";
// eslint-disable-next-line import/no-dynamic-require
const { env } = require(`../env/env.${environment}.js`);

const ApiClientImpl = new ApiClient(env);
const UsersRepositoryImpl = new UsersRepository(ApiClientImpl);

export default (_: any, inject: any) => {
  inject("users", UsersRepositoryImpl);
};
