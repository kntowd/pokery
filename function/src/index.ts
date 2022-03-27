import express from "express";
import { Server } from "socket.io";
import http from "http";
import serverMiddleWare from "./server";
import webSocketEvents from "./webSocket/index";
import router from "./router";

const app = express();

serverMiddleWare(app);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const port = 8080;

router(app);

webSocketEvents(io);

server.listen(port, async () => {});
