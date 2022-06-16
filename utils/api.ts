import axios, { AxiosResponse } from "axios";

import { flattenApiData } from "./flattenApiData";
import { Figure } from "../model/interface/Figure";
import { ApiResponse } from "../model/interface/ApiResponse";
import { ApiData } from "../model/interface/ApiData";
import { FigurePreview } from "../model/type/FigurePreview";

const apiUrl = process.env.API_URL;
const token = process.env.API_TOKEN;

const http = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

async function getFigure(slug: string): Promise<Figure> {
  const url = `/figures/${slug}`;
  const response = await http.get<ApiResponse<ApiData<Figure>>>(url);
  return flattenApiData(response.data.data);
}

type FigurePreviewResponse = ApiResponse<Array<ApiData<FigurePreview>>>;

async function getFigurePreviews(): Promise<Array<FigurePreview>> {
  const url = "/figures";
  const figurePreviews: Array<FigurePreview> = [];
  const params = new URLSearchParams();
  params.append("pagination[pageSize]", "100");
  params.append("pagination[page]", "1");
  params.append("fields", "name");
  params.append("fields", "slug");
  const response = await http.get<FigurePreviewResponse>(url, { params });
  figurePreviews.push(...response.data.data.map(flattenApiData));
  const pageCount = response.data.meta.pagination.pageCount;
  const promises: Array<Promise<AxiosResponse<FigurePreviewResponse>>> = [];
  for (let page = 2; page <= pageCount; page++) {
    params.set("pagination[page]", `${page}`);
    const promise = http.get<FigurePreviewResponse>(url, { params });
    promises.push(promise);
  }
  const responses = await Promise.all(promises);
  responses.forEach((res) =>
    figurePreviews.push(...res.data.data.map(flattenApiData))
  );
  return figurePreviews;
}

export const api = {
  getFigure: getFigure,
  getFigurePreviews: getFigurePreviews,
};
