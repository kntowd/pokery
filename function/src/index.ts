import { Request, Response } from "express";
import dbClient from "./connection";

const express = require("express");
const http = require("http");

const app = express();

const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server);
const cors = require("cors");

const port = 8080;

app.use(cors());

app.get("/api/title", (_req: Request, res: Response) => {
  res.json({ title: "pokery!!!" });
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
