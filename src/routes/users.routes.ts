import { Request, Response, Router } from "express";
import {
  loginController,
  registerController,
} from "~/controllers/users.controllers";
import {
  loginValidator,
  registerValidator,
} from "~/middlewares/users.middlewares";
import { wrapReqHandler } from "~/utils/handlers";

const userRouter = Router();

/*
 * Description: Register a new user
 * Path: /signup
 * Mehtod: POST
 * Body: {username: string, password: string, email: string, gender: <<default: 0>> enum, avatar_img<nullable>: string, date_of_birth: ISOString}
 */
userRouter.post(
  "/signup",
  registerValidator,
  wrapReqHandler(registerController),
);

/*
 * Description: Login
 * Path: /login
 * Mehtod: POST
 * Body: {email: string, password: string}
 */
userRouter.post("/login", loginValidator, wrapReqHandler(loginController));

export default userRouter;
