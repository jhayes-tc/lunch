import { Test, TestingModule } from '@nestjs/testing';
import { ReviewersController } from './reviewers.controller';

describe('ReviewersController', () => {
  let controller: ReviewersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewersController],
    }).compile();

    controller = module.get<ReviewersController>(ReviewersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
