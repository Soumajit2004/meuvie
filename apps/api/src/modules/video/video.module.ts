import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MediaModule } from '../../libs/media/media.module';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { Video } from './entites/video.entity';
import { VideoRepository } from './repositories/video.repository';
import { IVideoRepository } from './interfaces/video.repository.interface';
import { IVideoService } from './interfaces/video.service.interface';

@Module({
  imports: [TypeOrmModule.forFeature([Video]), MediaModule],
  controllers: [VideoController],
  providers: [
    { provide: IVideoService, useClass: VideoService },
    { provide: IVideoRepository, useClass: VideoRepository },
  ],
})
export class VideoModule {}
