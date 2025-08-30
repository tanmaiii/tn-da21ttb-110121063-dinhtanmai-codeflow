import { Transform, Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { GetAllQueryDto } from './common.dto';

export class CreateTopicDto {
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  public title: string;

  @IsString()
  @MinLength(1)
  @MaxLength(1000)
  public description: string;

  @IsString()
  @IsNotEmpty()
  public courseId: string;

  @IsBoolean()
  @IsNotEmpty()
  public isCustom: boolean;

  @IsOptional()
  @IsArray()
  public tags?: Array<string> | null;

  @IsOptional()
  @IsString()
  public status: string;

  @IsOptional()
  @IsString()
  public groupName: string;

  @IsOptional()
  @IsArray()
  public members?: Array<string> | null;
}

export class UpdateTopicDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  public title: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(1000)
  public description: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public courseId: string;

  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  public isCustom: boolean;

  @IsOptional()
  @IsArray()
  public tags?: Array<string> | null;

  @IsOptional()
  @IsString()
  public status: string;

  @IsOptional()
  @IsString()
  public groupName: string;

  @IsOptional()
  @IsArray()
  public members?: Array<string> | null;
}

export class CreateTopicEvaluationDto {
  @IsString()
  @IsNotEmpty()
  public evaluation: string;
  public topicId: string;
}

export class GetTopicAllDto extends GetAllQueryDto {
  @IsOptional()
  @IsString()
  public status: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === undefined || value === null || value === '') return undefined;
    if (value === true || value === false) return value;
    if (typeof value === 'string') {
      const lower = value.toLowerCase();
      if (lower === 'true') return true;
      if (lower === 'false') return false;
    }
    return undefined;
  })
  isCustom?: boolean;
}
