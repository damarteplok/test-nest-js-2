import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import * as FormData from 'form-data';

@Injectable()
export class NestCamundaLibraryService {
  private camundaUrl = 'http://localhost:8080/engine-rest'; // URL Camunda

  async deployBpmn(bpmnFile: Express.Multer.File) {
    try {
      const formData = new FormData();
      formData.append('deployment-name', 'deployment');
      formData.append('enable-duplicate-filtering', 'true');
      formData.append('deploy-changed-only', 'true');
      formData.append('file', bpmnFile.buffer, bpmnFile.originalname);

      const response = await axios.post(
        `${this.camundaUrl}/deployment/create`,
        formData,
        {
          headers: formData.getHeaders(),
        },
      );

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to deploy BPMN',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async startProcess(processDefinitionKey: string, variables: any) {
    try {
      const response = await axios.post(
        `${this.camundaUrl}/process-definition/key/${processDefinitionKey}/start`,
        {
          variables,
        },
      );
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to start process',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getTasks(processInstanceId: string) {
    try {
      const response = await axios.get(`${this.camundaUrl}/task`, {
        params: { processInstanceId },
      });
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to get tasks',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async completeTask(taskId: string, variables: any) {
    try {
      const response = await axios.post(
        `${this.camundaUrl}/task/${taskId}/complete`,
        {
          variables,
        },
      );
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to complete task',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
