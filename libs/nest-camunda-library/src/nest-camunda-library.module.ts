import { Module, DynamicModule, INestApplication } from '@nestjs/common';
import { NestCamundaLibraryService } from './nest-camunda-library.service';
import { NestCamundaLibraryController } from './nest-camunda-library.controller';
import { parseBpmnAndGenerateEndpoints } from 'Camunda/nest-camunda-library/helpers/bpmn/bpmn-parser';

@Module({
  providers: [NestCamundaLibraryService],
  exports: [NestCamundaLibraryService],
})
export class NestCamundaLibraryModule {
  static forRoot(bpmnXml: string): DynamicModule {
    return {
      module: NestCamundaLibraryModule,
      controllers: [NestCamundaLibraryController],
      providers: [
        {
          provide: 'BPMN_XML',
          useValue: bpmnXml,
        },
        NestCamundaLibraryService,
      ],
    };
  }

  static async init(app: INestApplication, bpmnXml: string) {
    await parseBpmnAndGenerateEndpoints(bpmnXml, app);
  }
}
