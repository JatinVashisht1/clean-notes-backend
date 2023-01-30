import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import createHttpError, { isHttpError } from "http-errors";
import morgan from "morgan";
// import registerDependencies from "../di/registerDependencies";
import UserRoutes from "./routes/UserRoutes";
import NoteRoutes from "./routes/NoteRoutes";

const app = express();

// registerDependencies();

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", UserRoutes);

app.use("/api/notes", NoteRoutes);

app.use((_req, _res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "An unknown error occurred.";
  let statusCode = 500;

  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  return res.status(statusCode).json({ success: false, message: errorMessage });
});

export default app;
