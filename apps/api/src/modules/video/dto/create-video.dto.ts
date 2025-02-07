import { VideoMetadataDto } from 'src/modules/video/dto/video-metadata.dto';

export class CreateVideoDto extends VideoMetadataDto {
  file: Express.Multer.File;
}
