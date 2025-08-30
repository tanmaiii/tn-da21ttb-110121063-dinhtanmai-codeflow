import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateSonarDto {
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  public name: string;
}

export class DeleteSonarDto {
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  public name: string;
}

export class GetMeasuresDto {
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  public name: string;
}
