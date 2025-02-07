import { CreateVideoDto } from '../dto/create-video.dto';
import { Video } from '../entites/video.entity';
import { VideoMedia } from 'src/libs/media/entites/video-media.entity';
import { VideoMetadataDto } from 'src/modules/video/dto/video-metadata.dto';

export abstract class IVideoRepository {
  abstract uploadNewVideo(
    createVideoRepositoryDto: CreateVideoDto & { media: VideoMedia },
  ): Promise<Video>;

  abstract incrementViews(videoId: string): Promise<void>;

  abstract getVideo(videoId: string): Promise<Video | null>;

  abstract updateVideoMetadata(
    videoId: string,
    updateVideoMetadata: Partial<VideoMetadataDto>,
  ): Promise<Video>;
}
