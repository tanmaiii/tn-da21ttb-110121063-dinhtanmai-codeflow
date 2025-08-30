export interface ILinkItem {
  vi: string;
  en: string;
  icon: string;
  labelKey: string;
  href: string;
  role?: string[];
}

export interface ResponseAPIDto<T> {
  data: T;
  message: string;
}
export interface PaginatedResponseAPIDto<T> {
  data: T;
  pagination: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
  message: string;
}

export interface IGetAllQuery {
  page: number;
  limit: number;
  sortBy?: string;
  order?: "ASC" | "DESC";
  search?: string;
}

export interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export interface IBaseEntity {
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}
