<template>
  <div>
    <h1>{{ title }}</h1>
    <button v-on:click="createRoom">部屋を作成する</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";

@Component({
  fetch() {
    const { apiBaseUrl } = this.$nuxt.context.$config.env;
    fetch(`${apiBaseUrl}/api/title`)
      .then((response) => response.json())
      .then((data) => {
        this.title = data.title;
      });
  },
})
export default class Index extends Vue {
  title = "";

  createRoom() {
    console.log("create room!!");
  }
}
</script>
