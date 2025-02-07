import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UploadVideoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;
}
