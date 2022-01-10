<template>
  <div>
    <h1>{{ title }}</h1>
    <button v-on:click="createRoom">部屋を作成する</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { io, Socket } from "socket.io-client";

@Component({
  // eslint-disable-next-line
  fetch(this: Index) {
    this.title = "pokery";
  },
})
export default class Index extends Vue {
  title = "";

  socket: Socket | null = null;

  created() {
    this.socket = io("http://localhost:8080");
  }

  createRoom() {
    const { apiBaseUrl } = this.$nuxt.context.$config.env;
    fetch(`${apiBaseUrl}/api/rooms`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        window.location.href = `http://localhost:3000/rooms/${data.roomId}`;
      });
  }
}
</script>
