<template>
  <div>
    <p>ニックネームを入力してください</p>
    <input type="text" v-model="name" placeholder="input name" />
    <button v-on:click="createUser">決定</button>
  </div>
</template>

<script>
import { Vue, Component } from "nuxt-property-decorator";

@Component
export default class CreateUser extends Vue {
  name = "";

  async created() {
    const { roomId } = this.$route.params;
    const userId = localStorage.getItem("userId");

    const { user } = await this.$users.get(userId, roomId);

    if (user.name != null) {
      this.$router.push(`/rooms/${roomId}`);
    }
  }

  async createUser() {
    const { roomId } = this.$route.params;

    localStorage.setItem("roomId", roomId);

    const { userId } = await this.$users.post(roomId, this.name);
    localStorage.setItem("userId", userId);

    this.$router.push(`/rooms/${roomId}`);
  }
}
</script>
