import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  error: Error,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(error.message);

  if (error.name === "CastError") {
    res.statusMessage = "id invalido";
    return res.status(400).send({ error: "id invalido" });
  } else if (error.name === "ValidationError") {
    res.statusMessage = error.message;
    return res.status(400).end();
  } else if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    res.statusMessage = "expected username to be unique";
    return res.status(400).end();
  }

  res.statusMessage = "Internal server error";
  res.status(500).end();
  next(error);
};
