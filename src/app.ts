import express, { Express, Request, Response } from "express";
import userRouter from "./routes/users.routes";
import bodyParser from "body-parser";
import { ErrorHandler } from "./middlewares/errors.middlewares";
const app: Express = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use("/api/user", userRouter);
app.use(ErrorHandler.handleError);
export default app;
