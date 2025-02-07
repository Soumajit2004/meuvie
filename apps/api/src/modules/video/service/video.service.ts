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
import { VideoMetadataDto } from 'src/modules/video/dto/video-metadata.dto';

@Injectable()
export class VideoService implements IVideoService {
  logger = new Logger(VideoService.name);

  /**
   * Constructor to inject dependencies.
   * @param mediaService - The media service for handling media operations.
   * @param videoRepository - The video repository for managing video entities.
   */
  constructor(
    private readonly mediaService: IMediaService,
    private readonly videoRepository: IVideoRepository,
  ) {}

  /**
   * Uploads a new video.
   * @param createVideoDto - Data transfer object containing video creation data.
   * @returns A promise that resolves to the created Video entity.
   * @throws InternalServerErrorException if the video upload or save fails.
   */
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

  /**
   * Retrieves a video by its ID.
   * @param videoId - The ID of the video to retrieve.
   * @returns A promise that resolves to the Video entity.
   * @throws NotFoundException if the video with the specified ID is not found.
   */
  async getVideo(videoId: string): Promise<Video> {
    const video = await this.videoRepository.getVideo(videoId);

    if (!video) {
      throw new NotFoundException(`Video with id: ${video.id} not found`);
    }

    return video;
  }

  /**
   * Updates the metadata of an existing video.
   * @param videoId - The ID of the video to update.
   * @param updateVideoMetadata - Partial data transfer object containing the metadata to update.
   * @returns A promise that resolves to the updated Video entity.
   */
  updateVideoMetadata(
    videoId: string,
    updateVideoMetadata: Partial<VideoMetadataDto>,
  ): Promise<Video> {
    return this.videoRepository.updateVideoMetadata(
      videoId,
      updateVideoMetadata,
    );
  }
}