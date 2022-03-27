import express from "express";
import cors from "cors";

const server = (app: express.Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
};

export default server;
