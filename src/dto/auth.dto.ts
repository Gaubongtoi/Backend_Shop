import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";
import { Genders } from "~/constants/Genders";
import { Users } from "~/entity";
import { IsUnique } from "~/validators/IsUniqueValidator";
import { Transform, Type } from "class-transformer";
export class RegisterDTO {
  // Name
  @IsNotEmpty({
    message: "Name is required",
  })
  @MinLength(5, {
    message: "Name is too short!",
  })
  @MaxLength(50, {
    message: "Name is less than 50 characters!",
  })
  name: string;

  // Password
  @IsNotEmpty({
    message: "Password is required",
  })
  @MinLength(8, {
    message: "At least 8 characters",
  })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        "Your password must be at least one uppercase letter, one lowercase letter, one number and one special character",
    },
  )
  password: string;

  // Email
  @IsNotEmpty({
    message: "Email is required",
  })
  @IsEmail()
  @IsUnique(Users, "email")
  email: string;

  // Gender
  @IsNotEmpty({
    message: "Please select your gender",
  })
  @IsEnum(Genders)
  gender: string;

  // Date of birth
  @IsNotEmpty({
    message: "Date of birth is required",
  })
  // @Type(() => Date)
  // @IsDate({
  //   message: "Invalid date format",
  // })
  day_of_birth: string;
}

export class LoginDTO {
  @IsNotEmpty({
    message: "Please enter your email address",
  })
  @IsEmail()
  email: string;

  @IsNotEmpty({
    message: "Password is required",
  })
  @MinLength(8, {
    message: "Your password must be at least 8 characters",
  })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        "Your password must be at least one uppercase letter, one lowercase letter, one number and one special character",
    },
  )
  password: string;
}
