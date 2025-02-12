import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Video } from '../entites/video.entity';
import { CreateVideoDto } from '../dto/create-video.dto';
import { IVideoRepository } from '../interfaces/video.repository.interface';
import { VideoMedia } from 'src/libs/media/entites/video-media.entity';
import { VideoMetadataDto } from 'src/modules/video/dto/video-metadata.dto';
import { NotFoundException } from '@nestjs/common';

/**
 * Repository class for managing video entities.
 * Implements the IVideoRepository interface.
 */
export class VideoRepository implements IVideoRepository {
  /**
   * Constructor to inject the video repository.
   * @param repository - The TypeORM repository for Video entities.
   */
  constructor(
    @InjectRepository(Video)
    private readonly repository: Repository<Video>,
  ) {}

  /**
   * Uploads a new video.
   * @param createVideoRepositoryDto - Data transfer object containing video creation data and media.
   * @returns A promise that resolves to the created Video entity.
   */
  uploadNewVideo(
    createVideoRepositoryDto: CreateVideoDto & { media: VideoMedia },
  ): Promise<Video> {
    const video = this.repository.create();

    video.title = createVideoRepositoryDto.title;
    video.description = createVideoRepositoryDto.description;
    video.media = createVideoRepositoryDto.media;

    return this.repository.save(video);
  }

  /**
   * Retrieves a video by its ID.
   * @param videoId - The ID of the video to retrieve.
   * @returns A promise that resolves to the Video entity or null if not found.
   */
  getVideo(videoId: string): Promise<Video | null> {
    return this.repository.findOne({ where: { id: videoId } });
  }

  /**
   * Increments the view count of a video by its ID.
   * @param videoId - The ID of the video to increment views.
   * @returns A promise that resolves when the operation is complete.
   */
  async incrementViews(videoId: string): Promise<void> {
    const video = await this.getVideo(videoId);

    video.views += 1;

    await this.repository.save(video);
  }

  /**
   * Updates the metadata of an existing video.
   * @param videoId - The ID of the video to update.
   * @param updateVideoMetadata - Partial data transfer object containing the metadata to update.
   * @returns A promise that resolves to the updated Video entity.
   * @throws NotFoundException if the video with the specified ID is not found.
   */
  async updateVideoMetadata(
    videoId: string,
    updateVideoMetadata: Partial<VideoMetadataDto>,
  ): Promise<Video> {
    const video = await this.getVideo(videoId);

    if (!video) {
      throw new NotFoundException(`Video with id: ${videoId} not found`);
    }

    video.title = updateVideoMetadata.title || video.title;
    video.description = updateVideoMetadata.description || video.description;
    return await this.repository.save(video);
  }

  /**
   * Deletes a video by its ID.
   * @param videoId - The ID of the video to delete.
   * @returns A promise that resolves when the operation is complete.
   */
  async deleteVideo(videoId: string): Promise<void> {
    await this.repository.delete(videoId);
  }
}
