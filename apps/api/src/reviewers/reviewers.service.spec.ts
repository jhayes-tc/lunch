import { Test, TestingModule } from '@nestjs/testing';
import { ReviewersService } from './reviewers.service';

describe('ReviewersService', () => {
  let service: ReviewersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReviewersService],
    }).compile();

    service = module.get<ReviewersService>(ReviewersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
