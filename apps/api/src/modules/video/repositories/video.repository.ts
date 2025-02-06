import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Video } from '../entites/video.entity';
import { CreateVideoDto } from '../dto/create-video.dto';
import { VideoMedia } from '../../../libs/media/entites/video-media.entity';
import { IVideoRepository } from '../interfaces/video.repository.interface';

export class VideoRepository implements IVideoRepository {
  constructor(
    @InjectRepository(Video)
    private readonly videoMediaRepository: Repository<Video>,
  ) {}

  uploadNewVideo(
    createVideoRepositoryDto: CreateVideoDto & { media: VideoMedia },
  ): Promise<Video> {
    const video = this.videoMediaRepository.create();

    video.title = createVideoRepositoryDto.title;
    video.description = createVideoRepositoryDto.description;
    video.media = createVideoRepositoryDto.media;

    return this.videoMediaRepository.save(video);
  }
}
