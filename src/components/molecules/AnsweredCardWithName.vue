<template>
  <div>
    <answered-card :user="user" />
    <div class="userName">{{ user.name }}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";

@Component
export default class AnsweredCardWithName extends Vue {
  @Prop() readonly user!: {
    id: number;
    point: number | string;
    answered: boolean;
  };
}
</script>

<style scoped>
.userName {
  text-align: center;
}
</style>
