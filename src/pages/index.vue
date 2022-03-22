<template>
  <div>
    <h1>{{ title }}</h1>
    <button v-on:click="createRoom">部屋を作成する</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";

@Component({
  // eslint-disable-next-line
  fetch(this: Index) {
    this.title = "pokery";
  },
})
export default class Index extends Vue {
  title = "";

  async createRoom() {
    const { appBaseUrl } = this.$nuxt.context.$config.env;

    const { roomId } = await this.$rooms.post();

    localStorage.setItem("roomId", roomId);
    window.location.href = `${appBaseUrl}/rooms/${roomId}/users`;
  }
}
</script>
