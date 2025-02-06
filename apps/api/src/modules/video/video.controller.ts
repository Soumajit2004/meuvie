import {
  Body,
  Controller,
  FileTypeValidator,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { IVideoService } from './interfaces/video.service.interface';
import { Video } from './entites/video.entity';
import { UploadVideoMetadataDto } from './dto/upload-video-metadata.dto';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: IVideoService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('mediaFile'))
  async uploadVideo(
    @Body() uploadVideoMetadata: UploadVideoMetadataDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 100000000 }),
          new FileTypeValidator({
            fileType: 'video/mp4',
          }),
        ],
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    videoFile: Express.Multer.File,
  ): Promise<Video> {
    return this.videoService.uploadVideo({
      ...uploadVideoMetadata,
      file: videoFile,
    });
  }
}
