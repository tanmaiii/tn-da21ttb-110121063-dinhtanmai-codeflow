import createHttpClient from '@/lib/createHttpClient';

class GeminiService {
  private client;

  constructor() {
    this.client = createHttpClient('gemini');
  }

  async test() {
    const res = await this.client.get('/test');
    return res.data;
  }
}

export default new GeminiService() as GeminiService;
