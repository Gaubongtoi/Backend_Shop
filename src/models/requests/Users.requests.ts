import { Genders } from "~/constants/Genders";

export interface RegisterReqBody {
  name: string;
  password: string;
  email: string;
  gender: Genders;
  avatar_img?: string;
  day_of_birth: string; // IOString
}

export interface LoginReqBody {
  email: string;
  password: string;
}
