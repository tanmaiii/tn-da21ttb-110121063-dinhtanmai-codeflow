import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { GetAllQueryDto } from './common.dto';
import { ENUM_USER_ROLE } from '@/data/enum';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  public name: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  public username: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  public password: string;

  @IsOptional()
  @IsString()
  public role: string;

  @IsOptional()
  @IsString()
  public status: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public avatar: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  public name: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  public username: string;

  @IsOptional()
  @IsString()
  public role: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  public password: string;
}

export class LoginUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  public password: string;
}

export class CreateUserGithubDto {
  @IsString()
  @IsNotEmpty()
  public uid: string;

  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public accessToken: string;
}

export class CreateUserGithub {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  id: number;

  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  avatar_url: string;
}

export class ForgotPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  public email: string;
}

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  public token: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  public newPassword: string;
}

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  public currentPassword: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  public newPassword: string;
}


export class GetAllUser extends GetAllQueryDto {
  @IsOptional()
  @IsEnum(ENUM_USER_ROLE)
  public role: ENUM_USER_ROLE;
}
