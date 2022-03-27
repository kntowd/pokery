import { Server, Socket } from "socket.io";
import { QueryTypes } from "sequelize";
import dbClient from "../connection";

const webSocketEvents = (io: Server) => {
  io.on("connection", (socket: Socket) => {
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
      await dbClient.query(
        "UPDATE users SET point = :point WHERE id = :userId",
        {
          replacements: { userId: data.userId, point: data.point },
          type: QueryTypes.INSERT,
        }
      );

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
};

export default webSocketEvents;
