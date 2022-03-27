<template>
  <div>
    <h1>{{ title }}</h1>
    <button v-on:click="createRoom">部屋を作成する</button>
  </div>
</template>

<script>
import { Vue, Component } from "nuxt-property-decorator";

@Component({
  fetch() {
    this.title = "pokery";
  },
})
export default class Index extends Vue {
  title = "";

  async createRoom() {
    const { roomId } = await this.$rooms.post();

    localStorage.setItem("roomId", roomId);
    this.$router.push(`/rooms/${roomId}/users`);
  }
}
</script>
