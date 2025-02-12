import { IsString, IsUrl } from 'class-validator';

export class CreateVideoMediaDto {
  @IsString()
  key: string;

  @IsString()
  originalFilename: string;

  @IsString()
  mimeType: string;

  @IsUrl()
  url: string;
}
