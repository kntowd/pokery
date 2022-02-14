import { Request, Response } from "express";
import { QueryTypes } from "sequelize";
import getRandomNumber from "./lib/randomNumber";
import dbClient from "./connection";

const express = require("express");
const http = require("http");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const cors = require("cors");

const port = 8080;

app.use(cors());

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

app.post("/api/users/:roomId", async (req: Request, res: Response) => {
  try {
    const userId = await dbClient.query(
      "INSERT INTO users (name, room_id) VALUES(:name, :roomId)",
      {
        replacements: { name: req.body.name, roomId: req.params.roomId },
        type: QueryTypes.INSERT,
      }
    );
    res.json(userId);
  } catch (err) {
    console.error(err);
  }

  console.log(req.params.roomId, req.params.userId == null);
});

app.get("/api/users/:userId/:roomId", async (req: Request, res: Response) => {
  try {
    const user = await dbClient.query(
      "SELECT name, point, room_id AS roomId FROM users WHERE room_id = :roomId AND id = :userId;",
      {
        replacements: { userId: req.params.userId, roomId: req.params.roomId },
        type: QueryTypes.SELECT,
      }
    );
    console.log("user------------------------", user);
    res.send(user);
  } catch (err) {
    console.error(err);
  }
});

io.on("connection", () => {
  console.log("a user connected");
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
