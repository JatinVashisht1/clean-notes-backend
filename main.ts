import "reflect-metadata";
import "dotenv/config";
import mongoose from "mongoose";
import { env } from "./core/envalidUtils";
import registerDependencies from "./di/registerDependencies";
import app from "./src/app";
const PORT = env.PORT | 5000;
const { MONGO_URI } = env;

(() => {
  registerDependencies();
  mongoose.connect(MONGO_URI).then(() => {
    console.log("mongoose connected");
    app.listen(5000, () => {
      console.log(`server up on http://localhost:${PORT}/`);
    });
  });
})();
