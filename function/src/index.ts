import { Request, Response } from "express";
import dbClient from "./connection";

const express = require("express");
const cors = require("cors");

const app = express();
const port = 8080;

app.use(cors());

app.get("/api/title", (_req: Request, res: Response) => {
  res.json({ title: "pokery!!!" });
});

app.listen(port, async () => {
  try {
    await dbClient.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  console.log(`Example app listening at http://localhost:${port}`);
});
