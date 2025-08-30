import { IsArray, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  public title: string;

  @IsString()
  @MinLength(1)
  @MaxLength(10000)
  public content: string;

  @IsOptional()
  @IsString()
  public thumbnail: string;

  @IsOptional()
  @IsArray()
  public tags?: Array<string> | null;
}

export class UpdatePostDto {
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  public title: string;

  @IsString()
  @MinLength(1)
  @MaxLength(10000)
  public content: string;

  @IsString()
  public thumbnail: string;
}
