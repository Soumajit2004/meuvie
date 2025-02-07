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
    private readonly repository: Repository<VideoMedia>,
  ) {}

  createVideoMedia(
    createVideoMediaDto: CreateVideoMediaDto,
  ): Promise<VideoMedia> {
    const video = this.repository.create();

    video.key = createVideoMediaDto.key;
    video.originalFileName = createVideoMediaDto.originalFilename;
    video.url = createVideoMediaDto.url;
    video.mimeType = createVideoMediaDto.mimeType;

    return this.repository.save(video);
  }

  async getVideoMediaById(key: string): Promise<VideoMedia | null> {
    return this.repository.findOne({ where: { key } });
  }

  async deleteVideoMedia(key: string): Promise<void> {
    await this.repository.delete(key);
  }
}
