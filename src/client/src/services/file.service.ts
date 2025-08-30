import { ResponseAPIDto } from '@/interfaces/common';
import createHttpClient from '@/lib/createHttpClient';

interface UploadResponseDto {
  fieldname: string;
  files: {
    path: string;
    originalname: string;
    mimetype: string;
    size: number;
  }[];
}

class FileService {
  private client;

  constructor() {
    this.client = createHttpClient('upload');
  }

  async upload(data: FormData): Promise<ResponseAPIDto<UploadResponseDto>> {
    const res = await this.client.post<ResponseAPIDto<UploadResponseDto>>('/', data, {
      headers: { Accept: 'application/form-data' },
    });
    return res.data;
  }

  async getAvatar(name: string): Promise<ResponseAPIDto<string>> {
    const res = await this.client.get<ResponseAPIDto<string>>(`/avatar/${name}`);
    return res.data;
  }
}

export default new FileService() as FileService;
