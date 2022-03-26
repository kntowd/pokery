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

  userId = null;

  async created() {
    const { roomId } = this.$route.params;

    const user = await this.$users.get(this.userId, roomId);

    if (user.length !== 0) {
      this.$router.push(`/rooms/${roomId}`);
    }
  }

  createUser() {
    const { roomId } = this.$route.params;

    localStorage.setItem("roomId", roomId);

    const { userId } = this.$users.post(roomId, this.name);

    localStorage.setItem("userId", userId);

    this.router.push(`/rooms/${roomId}`);
  }
}
</script>
