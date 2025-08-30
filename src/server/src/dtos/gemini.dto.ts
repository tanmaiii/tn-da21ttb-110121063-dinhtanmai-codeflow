import { IsString, IsOptional, IsArray, IsBoolean, ValidateNested, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class EvaluationCriteriaDto {
  @IsOptional()
  @IsBoolean()
  codeQuality?: boolean;

  @IsOptional()
  @IsBoolean()
  functionality?: boolean;

  @IsOptional()
  @IsBoolean()
  efficiency?: boolean;

  @IsOptional()
  @IsBoolean()
  readability?: boolean;

  @IsOptional()
  @IsBoolean()
  bestPractices?: boolean;

  @IsOptional()
  @IsBoolean()
  security?: boolean;
}

export class CodeEvaluationDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  language: string;

  @IsOptional()
  @IsString()
  exerciseDescription?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  requirements?: string[];

  @IsOptional()
  @ValidateNested()
  @Type(() => EvaluationCriteriaDto)
  evaluationCriteria?: EvaluationCriteriaDto;
}
