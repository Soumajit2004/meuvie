import { Injectable } from '@nestjs/common';

import { IMediaService } from '../../libs/media/interfaces/media.service.interface';
import { CreateVideoDto } from './dto/create-video.dto';
import { Video } from './entites/video.entity';
import { IVideoService } from './interfaces/video.service.interface';
import { IVideoRepository } from './interfaces/video.repository.interface';

@Injectable()
export class VideoService implements IVideoService {
  constructor(
    private readonly mediaService: IMediaService,
    private readonly videoRepository: IVideoRepository,
  ) {}

  async uploadVideo(createVideoDto: CreateVideoDto): Promise<Video> {
    const { file } = createVideoDto;

    const uploadedVideo = await this.mediaService.uploadVideoMedia(file);

    return this.videoRepository.uploadNewVideo({
      ...createVideoDto,
      media: uploadedVideo,
    });
  }
}
