<template>
  <div>
    <div class="choices-card">
      <div class="choices-card__item" @click="changePoint(1)">1</div>
      <div class="choices-card__item" @click="changePoint(2)">2</div>
      <div class="choices-card__item" @click="changePoint(3)">3</div>
      <div class="choices-card__item" @click="changePoint(5)">5</div>
      <div class="choices-card__item" @click="changePoint(8)">8</div>
      <div class="choices-card__item" @click="changePoint(13)">13</div>
    </div>
    <div class="user-card">
      <div
        class="user-card__item"
        :class="{ 'user-card__item--answered': isAnswered(user) }"
        v-for="user in users"
        :key="user.id"
      >
        {{ user.point === "secret" ? "?" : user.point }}
      </div>
    </div>
  </div>
</template>

<script la="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { io } from "socket.io-client";

@Component
export default class Room extends Vue {
  point = 0;

  socket = null;

  users = [];

  async created() {
    const { apiBaseUrl } = this.$nuxt.context.$config.env;
    if (localStorage.userId == null || localStorage.roomId == null) {
      this.$router.push(`/rooms/${this.$route.params.roomId}/users`);
    }

    const response = await fetch(
      `${apiBaseUrl}/api/users/${localStorage.userId}/${this.$route.params.roomId}`
    );

    const user = await response.json();

    if (user.length === 0) {
      this.$router.push(`/rooms/${this.$route.params.roomId}/users`);
    }

    const usersResponse = await fetch(
      `${apiBaseUrl}/api/users/${this.$route.params.roomId}`
    );

    const users = await usersResponse.json();

    this.updateUsersPoint(users);

    this.socket = io(apiBaseUrl);
    this.socket.emit("join_room", { roomId: this.$route.params.roomId });
    this.socket.on("joined_room", (data) => console.log(data));
    this.socket.on("user_points", (data) => {
      this.updateUsersPoint(data.users);
    });
  }

  updateUsersPoint(users) {
    this.users = users.map((user) => {
      if (user.id === Number(localStorage.userId)) {
        return user;
      }
      return { id: user.id, point: "secret" };
    });
  }

  changePoint(point) {
    this.socket.emit("add_point", {
      roomId: this.$route.params.roomId,
      userId: localStorage.userId,
      point,
    });
    this.point = point;
  }

  // eslint-disable-next-line class-methods-use-this
  isAnswered(user) {
    return user.point != null;
  }
}
</script>

<style>
.choices-card {
  display: flex;
}

.choices-card__item {
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

.user-card {
  display: flex;
}

.user-card__item {
  font-size: 45px;
  font-weight: 700;
  border-radius: 20px;
  width: 150px;
  height: 200px;
  margin: 20px;
  line-height: 200px;
  text-align: center;
  cursor: pointer;
  border-style: dotted;
}

.user-card__item--answered {
  border-style: solid;
  background-color: rgba(176, 123, 172, 0.4);
}
</style>
