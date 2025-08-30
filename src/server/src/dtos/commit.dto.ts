import { IsOptional, IsString } from 'class-validator';
import { GetAllQueryDto } from './common.dto';

export class GetCommitByRepoIdDto extends GetAllQueryDto {
  @IsOptional()
  @IsString()
  authorId?: string;
}
