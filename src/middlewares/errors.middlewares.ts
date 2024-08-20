import { NextFunction, Request, Response } from "express";
import { omit } from "lodash";
import { EntityNotFoundError } from "typeorm";
import HTTP_STATUS from "~/constants/HttpStatus";
import { ErrorWithStatus } from "~/models/Errors";

export class ErrorHandler {
  static handleError(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    if (err instanceof EntityNotFoundError) {
      return res.status(404).json({
        success: false,
        msg: "Page/Item you are looking for does not exist",
        error: err,
      });
    }

    if (err instanceof ErrorWithStatus) {
      return res.status(err.status).json(omit(err, "status"));
    }
    // Object.getOwnPropertyNames là 1 method của đối tượng Object, được sử dụng để trả về 1 mảng các tên
    // các thuộc tính (kể cả các thuộc tính không phải là enumrable)
    Object.getOwnPropertyNames(err).forEach((key) => {
      // Lọc qua mảng chứa các key là stack và message
      //
      Object.defineProperty(err, key, { enumerable: true });
    });
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message || "Something went wrong !",
      errInfor: omit(err, "stack"),
    });

    // return res.status(500).json({
    //   success: false,
    //   msg: "Something went wrong !",
    //   error: err,
    // });
  }
}
