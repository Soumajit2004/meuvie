import { CreateVideoDto } from '../dto/create-video.dto';
import { Video } from '../entites/video.entity';
import { VideoMetadataDto } from 'src/modules/video/dto/video-metadata.dto';

export abstract class IVideoService {
  abstract uploadVideo(createVideoDto: CreateVideoDto): Promise<Video>;

  abstract getVideo(videoId: string): Promise<Video>;

  abstract updateVideoMetadata(
    videoId: string,
    updateVideoMetadata: Partial<VideoMetadataDto>,
  ): Promise<Video>;

  abstract deleteVideo(videoId: string): Promise<void>;
}
