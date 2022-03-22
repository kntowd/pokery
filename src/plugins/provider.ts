import { ApiClient } from "~/repository/ApiClient";
import { RoomsRepository } from "~/repository/RoomsRepository";
import { UsersRepository } from "~/repository/UsersRepository";

const environment = process.env.NODE_ENV || "development";
// eslint-disable-next-line import/no-dynamic-require
const { env } = require(`../env/env.${environment}.js`);

const apiClientImpl = new ApiClient(env);
const usersRepository = new UsersRepository(apiClientImpl);
const roomsRepository = new RoomsRepository(apiClientImpl);

export default (_: any, inject: any) => {
  inject("users", usersRepository);
  inject("rooms", roomsRepository);
};
