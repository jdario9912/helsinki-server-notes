import "express-async-errors";
import express from "express";
import { corsMiddleware } from "./middleware/cors";
import infoRouter from "./routers/info";
import notesRouter from "./routers/notes";
import usersRouter from "./routers/users";
import { uknownEndpointLogger } from "./middleware/logger";
import { errorHandler } from "./middleware/errorHandler";
import { connectDB } from "./db/mongo";

connectDB();

const app = express();

app.disable("x-powered-by");
app.use(corsMiddleware);
app.use(express.json());

app.use("/api/info", infoRouter);

app.use("/api/notes", notesRouter);

app.use("/api/users", usersRouter);

app.use(uknownEndpointLogger);

app.use(errorHandler);

export default app;
