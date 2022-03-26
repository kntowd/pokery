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
    <div class="answered-field">
      <div
        class="answered-field__card"
        v-for="user in displayUsers"
        :key="user.id"
      >
        <answered-card :user="user" />
      </div>
    </div>
    <div>
      <button @click="revealAll()">Reveal cards</button>
    </div>
  </div>
</template>

<script>
import { Vue, Component } from "nuxt-property-decorator";
import { io } from "socket.io-client";

@Component
export default class Room extends Vue {
  fibonacciNumbers = [1, 2, 3, 5, 8, 13, 21];

  point = 0;

  socket = null;

  users = [];

  revealed = false;

  apiBaseUrl = this.$nuxt.context.$config.env.apiBaseUrl;

  async created() {
    if (localStorage.userId == null || localStorage.roomId == null) {
      this.$router.push(`/rooms/${this.$route.params.roomId}/users`);
    }

    const user = await this.$users.get(
      localStorage.userId,
      this.$route.params.roomId
    );

    if (user.length === 0) {
      this.$router.push(`/rooms/${this.$route.params.roomId}/users`);
    }

    this.users = await this.$users.getAll(this.$route.params.roomId);

    const room = await this.$rooms.get(this.$route.params.roomId);

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

  get displayUsers() {
    if (this.revealed) return this.users;

    return this.users.map((user) => {
      if (user.id === Number(localStorage.userId)) {
        return { id: user.id, point: user.point, answered: user.point != null };
      }
      return { id: user.id, point: "secret", answered: user.point != null };
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

.choices-field__card {
  margin: 20px;
}

.answered-field {
  display: flex;
}

.answered-field__card {
  margin: 20px;
}
</style>
