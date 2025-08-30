import { IGetAllQuery, PaginatedResponseAPIDto, ResponseAPIDto } from "@/interfaces/common";
import { ITag, ITagCreateDto } from "@/interfaces/tags";
import createHttpClient from "@/lib/createHttpClient";
import { AxiosInstance } from "axios";

class TagService {
  private client: AxiosInstance;

  constructor() {
    this.client = createHttpClient("tags");
  }

  async getAll(): Promise<ResponseAPIDto<ITag[]>> {
    const res = await this.client.get("/");
    return res.data;
  }

  async getAllPagi(params: IGetAllQuery): Promise<PaginatedResponseAPIDto<ITag[]>> {
    const res = await this.client.get("/all", { params });
    return res.data;
  }

  async getById(id: string): Promise<ResponseAPIDto<ITag>> {
    const res = await this.client.get(`/${id}`);
    return res.data;
  }

  async create(data: ITagCreateDto): Promise<ResponseAPIDto<ITag>> {
    const res = await this.client.post("/", data);
    return res.data;
  }

  async update(id: string, data: ITagCreateDto): Promise<ResponseAPIDto<ITag>> {
    const res = await this.client.put(`/${id}`, data);
    return res.data;
  }

  async delete(id: string): Promise<ResponseAPIDto<ITag>> {
    const res = await this.client.delete(`/${id}`);
    return res.data;
  }

  async destroy(id: string): Promise<ResponseAPIDto<ITag>> {
    const res = await this.client.delete(`/${id}/force`);
    return res.data;
  }

  async restore(id: string): Promise<ResponseAPIDto<ITag>> {
    const res = await this.client.put(`/${id}/restore`);
    return res.data;
  }
}

export default new TagService() as TagService;
