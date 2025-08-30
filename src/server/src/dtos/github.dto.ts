import { IsString, MinLength } from 'class-validator';

export class AddWebHookDto {
  @IsString()
  @MinLength(1)
  public webhookUrl: string;
}
