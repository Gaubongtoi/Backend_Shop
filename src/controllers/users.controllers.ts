import {
  LoginReqBody,
  RegisterReqBody,
} from "./../models/requests/Users.requests";
import { Request, Response } from "express";
import usersService from "~/services/user.services";
import { ParamsDictionary } from "express-serve-static-core";

export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterReqBody>,
  res: Response,
) => {
  // throw new Error('Loi roi')
  // json auto status(200)
  // Muốn cấu hình kiểu dữ liệu cho body trong req, ta tạo ra 1 thư mục models/requests/User.requests.ts
  // Sau đó khai báo biến và kiểu dữ liệu cho trường đó
  // req defautl type của nó là Request<P = core.ParamsDictionary, ResBody = any, ReqBody = any, ReqQuery = qs.ParsedQs, Locals extends Record<string, any> = Record<string, any>>
  // Chúng ta có thể modify lại cho ReqBody = any bằng interface đã được tạo ra ở models/requests/User.requests.ts
  // => req.body sẽ có kiểu dữ liệu là RegisterReqBody
  const result = await usersService.register(req.body);
  return res.json({
    msg: "Register success",
    result,
  });
};

export const loginController = async (
  req: Request<ParamsDictionary, any, LoginReqBody>,
  res: Response,
) => {
  const result = await usersService.login(req.body);
  return res.json({
    message: "Login success!",
    result,
  });
};
