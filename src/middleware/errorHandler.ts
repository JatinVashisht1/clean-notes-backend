/* eslint-disable @typescript-eslint/no-unused-vars */
import { error } from "console";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { isHttpError } from "http-errors";

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error);
  let errorMessage = "An unknown error occurred.";
  let statusCode = 500;

  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  return res.status(statusCode).json({ success: false, message: errorMessage });
};
