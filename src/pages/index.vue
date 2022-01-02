<template>
  <h1>{{title}}</h1>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({
  fetch(this: Index) {
    const apiBaseUrl = this.$nuxt.context.$config.env.apiBaseUrl;
    fetch(`${apiBaseUrl}/api/title`).then(response => response.json()).then((data) => this.title = data.title)
  }
})
export default class Index extends Vue{
  title = '';
}
</script>
