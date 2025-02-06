import { IsNotEmpty, IsString } from 'class-validator';

export class UploadVideoMetadataDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
