import Vue from "vue";
import { UsersInterface } from "../repository/UsersRepository";

declare module "*.vue" {
  export default Vue;
}

declare module "@nuxt/types" {
  interface Vue {
    $users: UsersInterface;
  }
}
