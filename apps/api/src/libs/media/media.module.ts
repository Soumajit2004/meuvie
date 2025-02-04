import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MediaService } from './media.service';
import { IMediaService } from './interfaces/media.service.interface';

import { ImageMedia } from './entites/image-media.entity';
import { VideoMedia } from './entites/video-media.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ImageMedia, VideoMedia])],
  providers: [
    {
      provide: IMediaService,
      useClass: MediaService,
    },
  ],
  exports: [{ provide: IMediaService, useClass: MediaService }],
})
export class MediaModule {}
