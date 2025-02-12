import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { CookieGuard } from 'src/modules/auth/guards/cookie.guard';
import { IVideoService } from 'src/modules/video/interfaces/video.service.interface';
import { Video } from 'src/modules/video/entites/video.entity';
import { VideoMetadataDto } from 'src/modules/video/dto/video-metadata.dto';

@Controller('video')
@UseGuards(CookieGuard)
export class VideoController {
  constructor(private readonly videoService: IVideoService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('mediaFile'))
  async uploadVideo(
    @Body() uploadVideoMetadata: VideoMetadataDto,
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

  @Get('/:id')
  getVideo(@Param('id') videoId: string): Promise<Video> {
    return this.videoService.getVideo(videoId);
  }

  @Patch('/:id')
  updateVideoMetadata(
    @Param('id') videoId: string,
    @Body() updateVideoMetadata: Partial<VideoMetadataDto>,
  ): Promise<Video> {
    return this.videoService.updateVideoMetadata(videoId, updateVideoMetadata);
  }

  @Delete('/:id')
  deleteVideo(@Param('id') videoId: string): Promise<void> {
    return this.videoService.deleteVideo(videoId);
  }
}
