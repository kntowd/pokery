import { UsersRepository } from "~/repository/usersRepository";

const UsersRepositoryImpl = new UsersRepository();

export default (_: any, inject: any) => {
  inject("users", UsersRepositoryImpl);
};
