import { Request, response, Response, Express } from "express";
import { QueryTypes } from "sequelize";
import getRandomNumber from "./lib/randomNumber";
import dbClient from "./connection";

const router = (app: Express) => {
  // 部屋を作成
  app.post("/api/rooms", async (_req: Request, res: Response) => {
    try {
      const roomId = getRandomNumber();
      await dbClient.query(
        `
      INSERT INTO rooms (id) 
      VALUES(:roomId)
    `,
        {
          replacements: { roomId },
          type: QueryTypes.INSERT,
        }
      );
      res.json({ roomId });
    } catch (err) {
      res.status(500);
    }
  });

  app.get("/api/rooms/:roomId", async (req: Request, res: Response) => {
    try {
      const result: { id: number; name: string; revealed: boolean }[] =
        await dbClient.query(
          `
        SELECT * from rooms 
        WHERE id = :roomId
        `,
          {
            replacements: { roomId: req.params.roomId },
            type: QueryTypes.SELECT,
          }
        );

      const room = result[0];
      room.revealed = !!room.revealed;

      res.json({ room });
    } catch (err) {
      res.status(500);
    }
  });

  // 特定の部屋のユーザを全て取得
  app.get("/api/users/:roomId", async (req: Request, res: Response) => {
    try {
      const users = await dbClient.query(
        `
        SELECT id, name, point, room_id AS roomId 
        FROM users 
        WHERE room_id = :roomId
      `,
        {
          replacements: { roomId: Number(req.params.roomId) },
          type: QueryTypes.SELECT,
        }
      );
      res.json({ users });
    } catch (err) {
      res.status(500);
    }
  });

  // 部屋に紐づくユーザを作成
  app.post("/api/users/:roomId", async (req: Request, res: Response) => {
    try {
      const userIds = await dbClient.query(
        "INSERT INTO users (name, room_id) VALUES(:name, :roomId)",
        {
          replacements: { name: req.body.name, roomId: req.params.roomId },
          type: QueryTypes.INSERT,
        }
      );
      res.json({ userId: userIds[0] });
    } catch (err) {
      res.status(500);
    }
  });

  // ユーザを取得
  app.get("/api/users/:userId/:roomId", async (req: Request, res: Response) => {
    try {
      const result = await dbClient.query(
        "SELECT name, point, room_id AS roomId FROM users WHERE room_id = :roomId AND id = :userId;",
        {
          replacements: {
            userId: req.params.userId,
            roomId: req.params.roomId,
          },
          type: QueryTypes.SELECT,
        }
      );
      const user = result[0];

      res.json({ user: user || {} });
    } catch (err) {
      response.status(500);
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
      res.send({ user });
    } catch (err) {
      response.status(500);
    }
  });
};

export default router;
