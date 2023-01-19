import "reflect-metadata";
import express from "express";

const app = express();

app.listen(5000, () => {
  console.log(`server up on http://localhost:5000/`);
});
