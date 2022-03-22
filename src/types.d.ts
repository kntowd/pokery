import { UsersInterface } from "./repository/UsersRepository";

declare module "vue/types/vue" {
  interface Vue {
    $users: UsersInterface;
  }
}
