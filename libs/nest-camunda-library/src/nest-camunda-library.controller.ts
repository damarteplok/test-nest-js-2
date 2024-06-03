import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { NestCamundaLibraryService } from 'Camunda/nest-camunda-library/nest-camunda-library.service';

@Controller('process')
export class NestCamundaLibraryController {
  constructor(private readonly camundaService: NestCamundaLibraryService) {}

  @Post('start/:processDefinitionKey')
  startProcess(
    @Param('processDefinitionKey') processDefinitionKey: string,
    @Body() variables: any,
  ) {
    return this.camundaService.startProcess(processDefinitionKey, variables);
  }

  @Get('tasks/:processInstanceId')
  getTasks(@Param('processInstanceId') processInstanceId: string) {
    return this.camundaService.getTasks(processInstanceId);
  }

  @Post('complete/:taskId')
  completeTask(@Param('taskId') taskId: string, @Body() variables: any) {
    return this.camundaService.completeTask(taskId, variables);
  }
}
