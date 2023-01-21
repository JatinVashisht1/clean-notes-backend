import "reflect-metadata";
import "dotenv/config";
import provideDependencies from "./di/provideDependencies";
import express from "express";
import mongoose from "mongoose";
import { env } from "./core/envalidUtils";

const PORT = env.PORT | 5000;
const { MONGO_URI } = env;

const app = express();

provideDependencies();

mongoose.connect(MONGO_URI).then(() => {
  console.log("mongoose connected");
  app.listen(5000, () => {
    console.log(`server up on http://localhost:${PORT}/`);
  });
});
