import { CreateVideoDto } from '../dto/create-video.dto';
import { VideoMedia } from '../../../libs/media/entites/video-media.entity';
import { Video } from '../entites/video.entity';

export abstract class IVideoRepository {
  abstract uploadNewVideo(
    createVideoRepositoryDto: CreateVideoDto & { media: VideoMedia },
  ): Promise<Video>;
}
