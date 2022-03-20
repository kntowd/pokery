<template>
  <div>
    <div class="choices-field">
      <div
        class="choices-field__card"
        v-for="number in fibonacciNumbers"
        :key="number"
      >
        <choice-card
          :content="number"
          @click="changePoint(number)"
        ></choice-card>
      </div>
    </div>
    <div class="answered-card">
      <div
        class="answered-card__item"
        :class="{ 'answered-card__item--answered': isAnswered(user) }"
        v-for="user in getUsers"
        :key="user.id"
      >
        {{ user.point === "secret" ? "?" : user.point }}
      </div>
    </div>
    <div>
      <button @click="revealAll()">Reveal cards</button>
    </div>
  </div>
</template>

<script la="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { io } from "socket.io-client";
import apiClient from "@/lib/apiClient";

@Component
export default class Room extends Vue {
  fibonacciNumbers = [1, 2, 3, 5, 8, 13];

  point = 0;

  socket = null;

  users = [];

  revealed = false;

  apiBaseUrl = this.$nuxt.context.$config.env.apiBaseUrl;

  async created() {
    if (localStorage.userId == null || localStorage.roomId == null) {
      this.$router.push(`/rooms/${this.$route.params.roomId}/users`);
    }

    const response = await fetch(
      `${this.apiBaseUrl}/api/users/${localStorage.userId}/${this.$route.params.roomId}`
    );

    const user = await response.json();

    if (user.length === 0) {
      this.$router.push(`/rooms/${this.$route.params.roomId}/users`);
    }

    const usersResponse = await fetch(
      `${this.apiBaseUrl}/api/users/${this.$route.params.roomId}`
    );

    const users = await usersResponse.json();

    this.users = users;

    const room = await apiClient(`/rooms/${this.$route.params.roomId}`);

    this.revealed = room.revealed;

    this.socket = io(this.apiBaseUrl, { transports: ["websocket"] });
    this.socket.emit("join_room", { roomId: this.$route.params.roomId });
    this.socket.on("joined_room", (data) => console.log(data));
    this.socket.on("user_points", (data) => {
      this.users = data.users;
    });
    this.socket.on("revealedAll", () => {
      this.revealed = true;
    });
  }

  get getUsers() {
    if (this.revealed) return this.users;

    return this.users.map((user) => {
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

  // eslint-disable-next-line class-methods-use-this
  async revealAll() {
    this.revealed = true;
    this.socket.emit("revealAll", { roomId: localStorage.roomId });
  }
}
</script>

<style>
.choices-field {
  display: flex;
}

.card {
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

.answered-card {
  display: flex;
}

.answered-card__item {
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

.answered-card__item--answered {
  border-style: solid;
  background-color: rgba(176, 123, 172, 0.4);
}
</style>
