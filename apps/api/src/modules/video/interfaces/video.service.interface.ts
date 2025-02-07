import { CreateVideoDto } from '../dto/create-video.dto';
import { Video } from '../entites/video.entity';

export abstract class IVideoService {
  abstract uploadVideo(createVideoDto: CreateVideoDto): Promise<Video>;

  abstract getVideo(videoId: string): Promise<Video>;
}
