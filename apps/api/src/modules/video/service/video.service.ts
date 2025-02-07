import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { IMediaService } from 'src/libs/media/interfaces/media.service.interface';
import { CreateVideoDto } from 'src/modules/video/dto/create-video.dto';
import { Video } from 'src/modules/video/entites/video.entity';
import { IVideoService } from 'src/modules/video/interfaces/video.service.interface';
import { IVideoRepository } from 'src/modules/video/interfaces/video.repository.interface';

@Injectable()
export class VideoService implements IVideoService {
  logger = new Logger(VideoService.name);

  constructor(
    private readonly mediaService: IMediaService,
    private readonly videoRepository: IVideoRepository,
  ) {}

  async uploadVideo(createVideoDto: CreateVideoDto): Promise<Video> {
    const { file } = createVideoDto;

    return this.mediaService
      .uploadVideoMedia(file)
      .then((uploadedVideo) => {
        this.logger.verbose(
          `Video with id: ${uploadedVideo.id} uploaded successfully`,
        );

        return this.videoRepository.uploadNewVideo({
          ...createVideoDto,
          media: uploadedVideo,
        });
      })
      .catch((error) => {
        this.logger.error(`Error while uploading video: ${error.message}`);

        throw new InternalServerErrorException('Failed to upload video');
      })
      .then((video) => {
        this.logger.verbose(`Video with id: ${video.id} saved successfully`);

        return video;
      })
      .catch((error) => {
        this.logger.error(`Error while saving video: ${error.message}`);

        throw new InternalServerErrorException('Failed to save video');
      });
  }

  async getVideo(videoId: string): Promise<Video> {
    const video = await this.videoRepository.getVideo(videoId);

    if (!video) {
      throw new NotFoundException(`Video with id: ${video.id} not found`);
    }

    return video;
  }
}
