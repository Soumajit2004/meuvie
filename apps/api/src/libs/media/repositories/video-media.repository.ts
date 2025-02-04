import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { VideoMedia } from '../entites/video-media.entity';
import { IVideoMediaRepository } from '../interfaces/repositories/video-media.repository.interface';
import { CreateVideoMediaDto } from '../dto/create-video-media.dto';

@Injectable()
export class VideoMediaRepository implements IVideoMediaRepository {
  constructor(
    @InjectRepository(VideoMedia)
    private readonly videoMediaRepository: Repository<VideoMedia>,
  ) {}

  createVideoMedia(
    createVideoMediaDto: CreateVideoMediaDto,
  ): Promise<VideoMedia> {
    return Promise.resolve(undefined);
  }
}
