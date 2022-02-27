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

  createUser() {
    const { apiBaseUrl, appBaseUrl } = this.$nuxt.context.$config.env;

    sessionStorage.setItem("roomId", this.$route.params.roomId);

    fetch(`${apiBaseUrl}/api/users/${this.$route.params.roomId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: this.name }),
    })
      .then((response) => response.json())
      .then((data) => {
        sessionStorage.setItem("userId", data.userId);
        window.location.href = `${appBaseUrl}/rooms/${this.$route.params.roomId}`;
      });
  }
}
</script>
