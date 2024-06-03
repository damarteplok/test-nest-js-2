import { Test, TestingModule } from '@nestjs/testing';
import { NestCamundaLibraryService } from './nest-camunda-library.service';

describe('NestCamundaLibraryService', () => {
  let service: NestCamundaLibraryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NestCamundaLibraryService],
    }).compile();

    service = module.get<NestCamundaLibraryService>(NestCamundaLibraryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
