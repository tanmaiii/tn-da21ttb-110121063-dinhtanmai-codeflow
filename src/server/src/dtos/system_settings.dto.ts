import { IsString, IsNotEmpty, IsOptional, IsIn } from 'class-validator';

export class CreateSystemSettingDto {
  @IsString()
  @IsNotEmpty()
  public key: string;

  @IsString()
  @IsNotEmpty()
  public value: string;

  @IsString()
  @IsOptional()
  @IsIn(['text', 'json', 'number', 'boolean'])
  public type?: string;
}

export class UpdateSystemSettingDto {
  @IsString()
  @IsOptional()
  public value?: string;

  @IsString()
  @IsOptional()
  @IsIn(['text', 'json', 'number', 'boolean'])
  public type?: string;
}

export class SetSettingValueDto {
  @IsNotEmpty()
  public value: any;

  @IsString()
  @IsOptional()
  @IsIn(['text', 'json', 'number', 'boolean'])
  public type?: string;
}
