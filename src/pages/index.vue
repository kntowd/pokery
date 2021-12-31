<template>
  <h1>pokery!!!</h1>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "IndexPage",

  fetch() {
    fetch('http://localhost:8080').then(response => response.json()).then(data => console.log(data))
  },
});
</script>
