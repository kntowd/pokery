<template>
  <div>
    <p>ニックネームを入力してください</p>
    <input type="text" v-model="name" placeholder="input name" />
    <button v-on:click="createUser">決定</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";

@Component
export default class CreateUser extends Vue {
  name = "";

  userId = null;

  async created() {
    const { apiBaseUrl } = this.$nuxt.context.$config.env;
    const { roomId } = this.$route.params;

    const response = await fetch(
      `${apiBaseUrl}/api/users/${localStorage.userId}/${roomId}`
    );

    const user = await response.json();

    if (user.length !== 0) {
      this.$router.push(`/rooms/${roomId}`);
    }
  }

  createUser() {
    const { appBaseUrl } = this.$nuxt.context.$config.env;
    const { roomId } = this.$route.params;

    localStorage.setItem("roomId", roomId);

    const { userId } = this.$users.post(roomId, this.name);

    localStorage.setItem("userId", userId);
    window.location.href = `${appBaseUrl}/rooms/${roomId}`;
  }
}
</script>
