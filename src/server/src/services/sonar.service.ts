import { HttpException } from '@/exceptions/HttpException';
import { SonarCreate, SonarMeasures } from '@/interfaces/sonar.ineterface';
import { logger } from '@/utils/logger';
import axios from 'axios';
import qs from 'qs';
import { Service } from 'typedi';

@Service()
export class SonarService {
  private baseUrl = 'https://sonarcloud.io/api';
  private organization = 'organization-codeflow';

  private headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  private auth = {
    username: process.env.SONAR_ORG_TOKEN || '',
    password: '',
  };

  // Tạo project trên sonar để lấy key
  public async createProject(projectName: string): Promise<SonarCreate> {
    try {
      const formData = qs.stringify({
        name: projectName,
        project: projectName.toLowerCase().replace(/\s+/g, '-'), // bạn có thể tuỳ chỉnh
        organization: this.organization,
      });

      const response = await axios.post(`${this.baseUrl}/projects/create`, formData, {
        headers: this.headers,
        auth: this.auth,
      });

      logger.info(`[Sonar Service] Created project: ${JSON.stringify(response.data, null, 2)}`);

      return response.data;
    } catch (err: any) {
      logger.error(`[Sonar Service] Failed: ${JSON.stringify(err.response.data, null, 2)}`);
      throw new HttpException(500, err.response.data);
    }
  }

  // Xóa project trên sonar
  public async deleteProject(projectName: string) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/projects/delete`,
        {
          project: projectName,
        },
        {
          headers: this.headers,
          auth: this.auth,
        },
      );
      logger.info(`[Sonar Service] Deleted project: ${JSON.stringify(response.data, null, 2)}`);
      return response.data;
    } catch (err: any) {
      logger.error(`[Sonar Service] Failed: ${JSON.stringify(err.response.data, null, 2)}`);
      throw new HttpException(500, err.response.data);
    }
  }

  // Lấy measures của project trên sonar
  public async getMeasures(projectKey: string): Promise<SonarMeasures> {
    try {
      const response = await axios.get(`${this.baseUrl}/measures/component`, {
        params: {
          component: projectKey,
          metricKeys: [
            'alert_status',
            'bugs',
            'vulnerabilities',
            'code_smells',
            'sqale_index',
            'sqale_rating',
            'reliability_rating',
            'security_rating',
            'security_hotspots',
            'security_review_rating',
            'security_hotspots_reviewed',
            'coverage',
            'line_coverage',
            'uncovered_lines',
            'lines_to_cover',
            'duplicated_lines_density',
            'duplicated_blocks',
            'duplicated_lines',
            'complexity',
            'cognitive_complexity',
            'ncloc',
            'files',
            'functions',
            'classes',
          ].join(','),
        },
        headers: this.headers,
        auth: this.auth,
      });

      logger.info(`[Sonar Service] Get measures success`);

      return response.data;
    } catch (err: any) {
      logger.error(`[Sonar Service] Failed: ${JSON.stringify(err.response.data, null, 2)}`);
      throw new HttpException(500, err.response.data);
    }
  }

  public async getProject(projectKey: string) {
    try {
      const response = await axios.get(`${this.baseUrl}/projects/search`, {
        params: {
          project: projectKey,
        },
      });

      logger.info(`[Sonar Service] Project: ${JSON.stringify(response.data, null, 2)}`);

      return response.data;
    } catch (err: any) {
      logger.error(`[Sonar Service] Failed: ${JSON.stringify(err.response.data, null, 2)}`);
      throw new HttpException(500, err.response.data);
    }
  }
}
