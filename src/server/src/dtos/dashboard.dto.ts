import { IsString } from 'class-validator';

export class GetCodeActivityDto {
  @IsString()
  public days: string;
}
