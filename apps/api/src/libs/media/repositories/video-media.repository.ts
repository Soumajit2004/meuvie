import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { IVideoMediaRepository } from 'src/libs/media/interfaces/repositories/video-media.repository.interface';
import { VideoMedia } from 'src/libs/media/entites/video-media.entity';
import { CreateVideoMediaDto } from 'src/libs/media/dto/create-video-media.dto';

/**
 * Service for managing video media entities.
 */
@Injectable()
export class VideoMediaRepository implements IVideoMediaRepository {
  /**
   * Constructs a new instance of the VideoMediaRepository.
   * @param repository - The TypeORM repository for VideoMedia entities.
   */
  constructor(
    @InjectRepository(VideoMedia)
    private readonly repository: Repository<VideoMedia>,
  ) {}

  /**
   * Creates a new video media entity.
   * @param createVideoMediaDto - Data transfer object containing the details of the video media to create.
   * @returns A promise that resolves to the created VideoMedia entity.
   */
  createVideoMedia(
    createVideoMediaDto: CreateVideoMediaDto,
  ): Promise<VideoMedia> {
    const video = this.repository.create();

    video.key = createVideoMediaDto.key;
    video.originalFileName = createVideoMediaDto.originalFilename;
    video.url = createVideoMediaDto.url;
    video.mimeType = createVideoMediaDto.mimeType;

    return this.repository.save(video);
  }

  /**
   * Retrieves a video media entity by its key.
   * @param key - The key of the video media to retrieve.
   * @returns A promise that resolves to the VideoMedia entity, or null if not found.
   */
  async getVideoMediaById(key: string): Promise<VideoMedia | null> {
    return this.repository.findOne({ where: { key } });
  }

  /**
   * Deletes a video media entity by its key.
   * @param key - The key of the video media to delete.
   * @returns A promise that resolves when the deletion is complete.
   */
  async deleteVideoMedia(key: string): Promise<void> {
    await this.repository.delete(key);
  }
}
