import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import * as crypto from 'node:crypto';

import { IMediaService } from '../interfaces/media.service.interface';
import { VideoMedia } from '../entites/video-media.entity';
import { IVideoMediaRepository } from '../interfaces/repositories/video-media.repository.interface';

/**
 * Service for handling media operations with AWS S3.
 * @implements {IMediaService}
 */
@Injectable()
export class AWSMediaService implements IMediaService {
  private readonly logger = new Logger(AWSMediaService.name);

  private readonly s3Client = new S3Client({
    region: this.configService.get('AWS_REGION'),
    endpoint: this.configService.get('AWS_ENDPOINT'),
    credentials: {
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
    },
  });
  private readonly BUCKET_NAME = this.configService.get('AWS_BUCKET_NAME');

  /**
   * Constructs the AWSMediaService.
   * @param {ConfigService} configService - Service for accessing environment variables.
   * @param {IVideoMediaRepository} videoMediaRepository - Repository for video media operations.
   */
  constructor(
    private readonly configService: ConfigService,
    private readonly videoMediaRepository: IVideoMediaRepository,
  ) {}

  /**
   * Generates a randomized file name.
   * @param {string} fileName - The original file name.
   * @returns {string} - The randomized file name.
   */
  private randomizeFileName(fileName: string): string {
    return `${crypto.randomUUID()}.${fileName.split('.').pop()}`;
  }

  /**
   * Uploads a video file to AWS S3 and saves the metadata to the database.
   * @param {Express.Multer.File} file - The video file to upload.
   * @returns {Promise<VideoMedia>} - The saved video media entity.
   */
  async uploadVideoMedia(file: Express.Multer.File): Promise<VideoMedia> {
    const randomizedFilename = this.randomizeFileName(file.originalname);
    const uniqueIdentifier = randomizedFilename.split('.')[0];

    const uploadResponse = await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.BUCKET_NAME,
        Key: randomizedFilename,
        Body: file.buffer,
      }),
    );

    this.logger.verbose(
      `File uploaded to S3: ${uploadResponse.$metadata.httpStatusCode}`,
    );

    const databaseVideoMedia = await this.videoMediaRepository.createVideoMedia(
      {
        id: uniqueIdentifier,
        fileName: randomizedFilename,
        url: `https://${this.BUCKET_NAME}.s3.amazonaws.com/${randomizedFilename}`,
      },
    );

    this.logger.verbose('Video media saved to database');

    return databaseVideoMedia;
  }
}
