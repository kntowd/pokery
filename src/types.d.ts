import { UsersInterface } from "./repository/usersRepository";

declare module "vue/types/vue" {
  // 3. 拡張した Vue を定義します
  interface Vue {
    $users: UsersInterface;
  }
}
