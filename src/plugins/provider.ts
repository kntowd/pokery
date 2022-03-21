import { ApiClient } from "~/repository/ApiClient";
import { UsersRepository } from "~/repository/UsersRepository";

const ApiClientImpl = new ApiClient();
const UsersRepositoryImpl = new UsersRepository(ApiClientImpl);

export default (_: any, inject: any) => {
  inject("users", UsersRepositoryImpl);
};
