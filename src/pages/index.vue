<template>
  <h1>{{title}}</h1>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({
  fetch(this: Index) {
    fetch('http://localhost:8080/api/title').then(response => response.json()).then((data) => this.title = data.title)
  }
})
export default class Index extends Vue{
  title = '';
}
</script>
