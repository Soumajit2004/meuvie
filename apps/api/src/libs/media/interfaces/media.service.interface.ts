import { VideoMedia } from '../entites/video-media.entity';

export abstract class IMediaService {
  abstract uploadVideo(file: Express.Multer.File): Promise<VideoMedia>;
}
