import { IsOptional, IsString, IsIn } from 'class-validator';
import { GetAllQueryDto } from './common.dto';

export class CodeAnalysisTimeframeQueryDto {
  @IsOptional()
  @IsString()
  @IsIn(['7d', '30d', '3m', '6m', '1y'])
  public timeframe?: string = '7d';
}

export class GetCodeAnalysisByRepoIdDto extends GetAllQueryDto {
  @IsOptional()
  @IsString()
  authorId?: string;
}
