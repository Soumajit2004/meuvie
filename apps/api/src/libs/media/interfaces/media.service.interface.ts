import { VideoMedia } from '../entites/video-media.entity';

export abstract class IMediaService {
  abstract uploadVideoMedia(file: Express.Multer.File): Promise<VideoMedia>;
}
