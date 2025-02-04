import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MediaModule } from '../../libs/media/media.module';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { Video } from './video.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Video]), MediaModule],
  controllers: [VideoController],
  providers: [VideoService],
})
export class VideoModule {}
