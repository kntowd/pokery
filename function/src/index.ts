import { Request, Response } from "express";
import { QueryTypes } from "sequelize";
import { Server, Socket } from "socket.io";
import getRandomNumber from "./lib/randomNumber";
import dbClient from "./connection";

const express = require("express");
const http = require("http");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const cors = require("cors");

const port = 8080;

app.use(cors());

// 部屋を作成
app.post("/api/rooms", async (_req: Request, res: Response) => {
  const roomId = getRandomNumber();
  try {
    await dbClient.query("INSERT INTO rooms (id) VALUES(:roomId)", {
      replacements: { roomId },
      type: QueryTypes.INSERT,
    });
  } catch (err) {
    console.error(err);
  }

  res.json({ roomId });
});

app.get("/api/rooms/:roomId", async (req: Request, res: Response) => {
  try {
    const room = await dbClient.query(
      "SELECT * from rooms where id = :roomId",
      {
        replacements: { roomId: req.params.roomId },
        type: QueryTypes.SELECT,
      }
    );
    res.send(room);
  } catch (err) {
    console.error(err);
  }
});

// 特定の部屋のユーザを全て取得
app.get("/api/users/:roomId", async (req: Request, res: Response) => {
  try {
    const users = await dbClient.query(
      "SELECT id, name, point, room_id AS roomId FROM users WHERE room_id = :roomId",
      {
        replacements: { roomId: Number(req.params.roomId) },
        type: QueryTypes.SELECT,
      }
    );
    res.send(users);
  } catch (err) {
    console.error(err);
  }
});

// 部屋に紐づくユーザを作成
app.post("/api/users/:roomId", async (req: Request, res: Response) => {
  try {
    const userId = await dbClient.query(
      "INSERT INTO users (name, room_id) VALUES(:name, :roomId)",
      {
        replacements: { name: req.body.name, roomId: req.params.roomId },
        type: QueryTypes.INSERT,
      }
    );
    res.json({ userId: userId[0] });
  } catch (err) {
    console.error(err);
  }

  console.log(req.params.roomId, req.params.userId == null);
});

// ユーザを取得
app.get("/api/users/:userId/:roomId", async (req: Request, res: Response) => {
  try {
    const user = await dbClient.query(
      "SELECT name, point, room_id AS roomId FROM users WHERE room_id = :roomId AND id = :userId;",
      {
        replacements: {
          userId: req.params.userId,
          roomId: req.params.roomId,
        },
        type: QueryTypes.SELECT,
      }
    );
    console.log("user------------------------", user);
    res.send(user);
  } catch (err) {
    console.error(err);
  }
});

// ユーザのポイントを更新
app.put("/api/users/:userId", async (req: Request, res: Response) => {
  try {
    const user = await dbClient.query(
      "UPDATE users SET point = :point WHERE id = :userId",
      {
        replacements: { userId: req.params.userId, point: req.body.point },
        type: QueryTypes.INSERT,
      }
    );
    res.send(user);
  } catch (err) {
    console.error(err);
  }
});

io.on("connection", (socket: Socket) => {
  console.log("socketId", socket.id);
  socket.on("disconnect", (reason) => {
    console.log(reason);
    console.log(socket.id);
  });

  console.log("a user connected");
  socket.on("join_room", async (data: { roomId: string }) => {
    socket.join(data.roomId);
    const users = await dbClient.query(
      "SELECT id, point FROM users WHERE room_id = :roomId;",
      {
        replacements: {
          roomId: data.roomId,
        },
        type: QueryTypes.SELECT,
      }
    );
    io.to(data.roomId).emit("user_points", { users });
    io.to(data.roomId).emit("joined_room", "部屋に参加したよ");
  });

  socket.on("add_point", async (data) => {
    await dbClient.query("UPDATE users SET point = :point WHERE id = :userId", {
      replacements: { userId: data.userId, point: data.point },
      type: QueryTypes.INSERT,
    });

    const users = await dbClient.query(
      "SELECT id, point FROM users WHERE room_id = :roomId;",
      {
        replacements: {
          roomId: data.roomId,
        },
        type: QueryTypes.SELECT,
      }
    );

    io.to(data.roomId).emit("user_points", { users });
  });

  socket.on("revealAll", (data) => {
    io.to(data.roomId).emit("revealedAll");
  });
});

server.listen(port, async () => {
  try {
    await dbClient.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  console.log(`Example app listening at http://localhost:${port}`);
});
