<template>
  <div class="card choices-field__card" @click="click(content)">
    {{ content }}
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";

@Component
export default class ChoiceCard extends Vue {
  @Prop() readonly content!: number;

  click(content) {
    this.$emit("click", content);
  }
}
</script>

<style scoped>
.card {
  background-color: #b07bac;
  color: #fff;
  font-size: 45px;
  font-weight: 700;
  border-radius: 20px;
  width: 150px;
  height: 200px;
  line-height: 200px;
  text-align: center;
  cursor: pointer;
}
</style>
