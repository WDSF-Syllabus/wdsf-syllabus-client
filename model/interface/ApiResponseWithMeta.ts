import { ApiResponse } from "./ApiResponse";

export interface ApiResponseWithMeta<T> extends ApiResponse<T> {
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
