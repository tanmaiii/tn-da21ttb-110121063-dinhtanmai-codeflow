import { IsNotEmpty, IsNumber, IsString, IsOptional, IsBoolean, IsEnum } from 'class-validator';
import { GetAllQueryDto } from './common.dto';

export class CreateNotificationDto {
  @IsNumber()
  @IsNotEmpty()
  public userId: number;

  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  @IsNotEmpty()
  public message: string;

  @IsString()
  @IsOptional()
  public type?: string;

  @IsString()
  @IsOptional()
  public link?: string;
}

export class UpdateNotificationDto {
  @IsString()
  @IsOptional()
  public title?: string;

  @IsString()
  @IsOptional()
  public message?: string;

  @IsString()
  @IsOptional()
  public type?: string;

  @IsString()
  @IsOptional()
  public link?: string;
}

export class GetAllNotificationsDto extends GetAllQueryDto {
  @IsOptional()
  @IsEnum(['true', 'false'])
  public isRead?: string;
}
