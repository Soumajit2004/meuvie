import { VideoMedia } from '../../entites/video-media.entity';
import { CreateVideoMediaDto } from '../../dto/create-video-media.dto';

export abstract class IVideoMediaRepository {
  abstract createVideoMedia(
    createVideoMediaDto: CreateVideoMediaDto,
  ): Promise<VideoMedia>;
}
