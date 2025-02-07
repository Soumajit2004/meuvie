import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class VideoMetadataDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;
}
