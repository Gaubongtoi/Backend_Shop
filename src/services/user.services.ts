import { validate } from "class-validator";
import { hash, compare } from "bcryptjs";
import { RegisterDTO } from "~/dto/auth.dto";
import {
  LoginReqBody,
  RegisterReqBody,
} from "~/models/requests/Users.requests";
import { AppDataSource } from "~/database/data-source";
import { Users } from "~/entity";
import { Roles } from "~/entity/Roles";
import HTTP_STATUS from "~/constants/HttpStatus";
import { ErrorWithStatus } from "~/models/Errors";
import { signToken } from "~/utils/jwt";
import { TokenType } from "~/constants/enums";
import { config } from "dotenv";
import { RefreshTokens } from "~/entity/RefreshTokens";
config();

class UserServices {
  private signAccessToken(user_id: number) {
    return signToken({
      payload: { user_id, type: TokenType.AccessToken },
      privateKey: process.env.JWT_ACCESS_TOKEN_TYPE,
      options: {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
      },
    });
  }
  private signRefreshToken(user_id: number) {
    return signToken({
      payload: {
        user_id,
        type: TokenType.RefreshToken,
      },
      privateKey: process.env.JWT_REFRESH_TOKEN_TYPE,
      options: {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
      },
    });
  }
  async register(payload: RegisterReqBody) {
    payload.password = await hash(payload.password, 12);
    const role = await AppDataSource.getRepository(Roles).findOne({
      where: { id: 1 },
    });
    if (!role) {
      throw new ErrorWithStatus({
        message: "Not found role in database",
        status: HTTP_STATUS.NOT_FOUND,
      });
    }
    const user = await AppDataSource.getRepository(Users).save({
      ...payload,
      role: role,
    });
    if (!user) {
      throw new ErrorWithStatus({
        message: "An unexpected error occurred",
        status: HTTP_STATUS.BAD_REQUEST,
      });
    }
    const [access_token, refresh_token] = await Promise.all([
      this.signAccessToken(user.id),
      this.signRefreshToken(user.id),
    ]);
    const refreshTokens = await AppDataSource.getRepository(RefreshTokens).save(
      {
        token: refresh_token,
        users: user,
      },
    );
    console.log(refreshTokens);
    return {
      user: {
        ...user,
        role_id: role.id,
      },
      access_token,
      refresh_token,
    };
  }
  async login(payload: LoginReqBody) {
    const { email, password } = payload;
    let user = await AppDataSource.getRepository(Users).findOne({
      where: { email: email },
    });
    if (!user) {
      throw new ErrorWithStatus({
        message: "Not found user. Please try another email!",
        status: HTTP_STATUS.NOT_FOUND,
      });
    }
    // Check and compare input password with password in database
    let checkPassword = await compare(password, user.password); // Asynchronously
    if (!checkPassword) {
      throw new ErrorWithStatus({
        message: "Incorrect password",
        status: HTTP_STATUS.UNAUTHORIZED,
      });
    }
    // Make a signature access_token and refresh_token for user
    let [access_token, refresh_token] = await Promise.all([
      this.signAccessToken(user.id),
      this.signRefreshToken(user.id),
    ]);
    // Add refresh_token to database
    await AppDataSource.getRepository(RefreshTokens).save({
      token: refresh_token,
      users: user,
    });
    return {
      access_token,
      refresh_token,
    };
  }
}

const usersService = new UserServices();
export default usersService;
