<template>
  <div class="card" :class="{ 'card--answered': user.answered }">
    {{ user.point === "secret" ? "?" : user.point }}
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";

@Component
export default class AnsweredCard extends Vue {
  @Prop() readonly user!: {
    id: number;
    point: number | string;
    answered: boolean;
  };
}
</script>

<style scoped>
.card {
  font-size: 45px;
  font-weight: 700;
  border-radius: 20px;
  width: 150px;
  height: 200px;
  line-height: 200px;
  text-align: center;
  cursor: pointer;
  border-style: dotted;
}

.card--answered {
  border-style: solid;
  background-color: rgba(176, 123, 172, 0.4);
}
</style>
