import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTagDto {
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  public name: string;

  @IsString()
  @MinLength(1)
  @MaxLength(255)
  public description: string;
}

export class UpdateTagDto {
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  public name: string;

  @IsString()
  @MinLength(1)
  @MaxLength(255)
  public description: string;
}
