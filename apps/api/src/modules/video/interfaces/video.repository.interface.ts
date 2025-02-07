import { CreateVideoDto } from '../dto/create-video.dto';
import { Video } from '../entites/video.entity';
import { VideoMedia } from 'src/libs/media/entites/video-media.entity';

export abstract class IVideoRepository {
  abstract uploadNewVideo(
    createVideoRepositoryDto: CreateVideoDto & { media: VideoMedia },
  ): Promise<Video>;

  abstract getVideo(videoId: string): Promise<Video | null>;
}
