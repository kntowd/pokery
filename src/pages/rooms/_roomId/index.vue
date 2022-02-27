<template>
  <div class="card">
    <div class="card__item" @click="changePoint(1)">1</div>
    <div class="card__item">2</div>
    <div class="card__item">3</div>
    <div class="card__item">5</div>
    <div class="card__item">8</div>
    <div class="card__item">13</div>
  </div>
</template>

<script la="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { io } from "socket.io-client";

@Component
export default class Room extends Vue {
  point = 0;

  socket = null;

  async created() {
    const { apiBaseUrl } = this.$nuxt.context.$config.env;
    if (sessionStorage.userId == null || sessionStorage.roomId == null) {
      this.$router.push(`/rooms/${this.$route.params.roomId}/users`);
    }

    const response = await fetch(
      `${apiBaseUrl}/api/users/${sessionStorage.userId}/${this.$route.params.roomId}`
    );

    const user = await response.json();

    if (user.length === 0) {
      this.$router.push(`/rooms/${this.$route.params.roomId}/users`);
    }

    this.socket = io(apiBaseUrl);
    this.socket.emit("join_room", { roomId: this.$route.params.roomId });
    this.socket.on("joined_room", (data) => console.log(data));
    this.socket.on("user_points", (data) => console.log(data));
  }

  changePoint(point) {
    this.socket.emit("add_point", {
      roomId: this.$route.params.roomId,
      userId: sessionStorage.userId,
      point,
    });
    this.point = point;
  }
}
</script>

<style>
.card {
  display: flex;
}

.card__item {
  background-color: #b07bac;
  color: #fff;
  font-size: 45px;
  font-weight: 700;
  border-radius: 20px;
  width: 150px;
  height: 200px;
  margin: 20px;
  line-height: 200px;
  text-align: center;
  cursor: pointer;
}
</style>
