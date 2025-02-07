import { IsString, IsUrl } from 'class-validator';

export class CreateVideoMediaDto {
  @IsString()
  id: string;

  @IsString()
  fileName: string;

  @IsUrl()
  url: string;
}
