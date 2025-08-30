import { IUser } from "./user";

export interface ILoginWithGithub {
  email: string;
  uid: string;
  accessToken: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ISignup {
  email: string;
  password: string;
  name: string;
}

export interface TokenDto {
  expiresIn: number;
  token: string;
}

export interface LoginResponseDto {
  data: IUser;
  message: string;
  accessToken: TokenDto;
}
