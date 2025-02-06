import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AWSMediaService } from './services/aws-media.service';
import { IMediaService } from './interfaces/media.service.interface';

import { ImageMedia } from './entites/image-media.entity';
import { VideoMedia } from './entites/video-media.entity';

import { IVideoMediaRepository } from './interfaces/repositories/video-media.repository.interface';
import { VideoMediaRepository } from './repositories/video-media.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ImageMedia, VideoMedia]), ConfigModule],
  providers: [
    {
      provide: IMediaService,
      useClass: AWSMediaService,
    },
    {
      provide: IVideoMediaRepository,
      useClass: VideoMediaRepository,
    },
  ],
  exports: [{ provide: IMediaService, useClass: AWSMediaService }],
})
export class MediaModule {}
