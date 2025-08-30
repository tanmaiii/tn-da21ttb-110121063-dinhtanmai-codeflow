import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCommentDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  public content: string;

  @IsOptional()
  @IsString()
  public submissionId?: string;

  @IsOptional()
  @IsString()
  public postId?: string;

  @IsOptional()
  @IsString()
  public courseId?: string;

  @IsOptional()
  @IsString()
  public parentId?: string; // Id of the parent comment
}
