import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { CookieGuard } from 'src/modules/auth/guards/cookie.guard';
import { IVideoService } from 'src/modules/video/interfaces/video.service.interface';
import { UploadVideoDto } from 'src/modules/video/dto/upload-video.dto';
import { Video } from 'src/modules/video/entites/video.entity';

@Controller('video')
@UseGuards(CookieGuard)
export class VideoController {
  constructor(private readonly videoService: IVideoService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('mediaFile'))
  async uploadVideo(
    @Body() uploadVideoMetadata: UploadVideoDto,
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
}
