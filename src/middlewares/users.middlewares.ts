import { ParamsDictionary } from "express-serve-static-core";
import { NextFunction, Request, Response } from "express";
import { LoginDTO, RegisterDTO } from "~/dto/auth.dto";
import {
  LoginReqBody,
  RegisterReqBody,
} from "~/models/requests/Users.requests";
import { validate } from "class-validator";
import HTTP_STATUS from "~/constants/HttpStatus";
import { AppDataSource } from "~/database/data-source";
import { Roles } from "~/entity/Roles";
export const registerValidator = async (
  req: Request<ParamsDictionary, any, RegisterReqBody>,
  res: Response,
  next: NextFunction,
) => {
  const { name, password, email, gender, day_of_birth } = req.body;
  const dto = new RegisterDTO();
  dto.name = name;
  dto.password = password;
  dto.email = email;
  dto.gender = gender;
  dto.day_of_birth = day_of_birth;
  const errors = await validate(dto);
  if (errors && errors.length > 0) {
    let errMess = errors.map((err) => err.constraints);
    return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({
      message: "Invalid register data",
      errors: errMess,
    });
  }
  next();
};

export const loginValidator = async (
  req: Request<ParamsDictionary, any, LoginReqBody>,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;
  const dto = new LoginDTO();
  dto.email = email;
  dto.password = password;
  const errors = await validate(dto);
  if (errors && errors.length > 0) {
    return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({
      message: "Invalid login data",
      errors,
    });
  }
  next();
};
