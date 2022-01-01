<template>
  <h1>{{title}}</h1>
</template>

<script lang="ts">
export default{
  data() {
    return {
      title:  ''
    }
  },

  fetch() {
    fetch('http://localhost:8080').then(response => response.json()).then((data) => this.title = data.title)
  }
}
</script>
