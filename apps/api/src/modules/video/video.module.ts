import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MediaModule } from 'src/libs/media/media.module';
import { VideoService } from 'src/modules/video/service/video.service';
import { Video } from 'src/modules/video/entites/video.entity';
import { IVideoService } from 'src/modules/video/interfaces/video.service.interface';
import { IVideoRepository } from 'src/modules/video/interfaces/video.repository.interface';
import { VideoRepository } from 'src/modules/video/repositories/video.repository';
import { VideoController } from 'src/modules/video/video.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Video]), MediaModule],
  controllers: [VideoController],
  providers: [
    { provide: IVideoService, useClass: VideoService },
    { provide: IVideoRepository, useClass: VideoRepository },
  ],
})
export class VideoModule {}
