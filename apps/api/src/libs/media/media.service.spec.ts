import { Test, TestingModule } from '@nestjs/testing';
import { AwsMediaService } from './aws-media.service';

describe('MediaService', () => {
  let service: AwsMediaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AwsMediaService],
    }).compile();

    service = module.get<AwsMediaService>(AwsMediaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
