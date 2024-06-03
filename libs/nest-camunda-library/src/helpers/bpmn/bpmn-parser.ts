// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import BpmnModdle from 'bpmn-moddle';
import { INestApplication } from '@nestjs/common';
import { NestCamundaLibraryService } from 'Camunda/nest-camunda-library';
import { NestCamundaLibraryController } from 'Camunda/nest-camunda-library/nest-camunda-library.controller';

export async function parseBpmnAndGenerateEndpoints(
  bpmnXml: string,
  app: INestApplication,
) {
  const moddle = new BpmnModdle();
  const { rootElement: definitions } = await moddle.fromXML(bpmnXml);
  const process = definitions.rootElements.find(
    (el) => el.$type === 'bpmn:Process',
  );

  if (!process) {
    throw new Error('No process found in BPMN XML');
  }

  process.flowElements.forEach((element) => {
    if (element.$type === 'bpmn:StartEvent') {
      const controller = new NestCamundaLibraryController(
        new NestCamundaLibraryService(),
      );
      app.use('/process', controller);
    }
  });
}
