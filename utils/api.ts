import axios, { AxiosResponse } from "axios";

import { flattenApiData } from "./flattenApiData";
import { Figure } from "../model/interface/Figure";
import { ApiResponse } from "../model/interface/ApiResponse";
import { ApiData } from "../model/interface/ApiData";

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

async function getFigures(): Promise<Array<Figure>> {
  const url = "/figures";
  const figures: Array<Figure> = [];
  const response = await http.get<ApiResponse<Array<ApiData<Figure>>>>(url);
  figures.push(...response.data.data.map(flattenApiData));
  const pageCount = response.data.meta.pagination.pageCount;
  const promises: Array<
    Promise<AxiosResponse<ApiResponse<Array<ApiData<Figure>>>>>
  > = [];
  for (let page = 2; page <= pageCount; page++) {
    const promise = http.get<ApiResponse<Array<ApiData<Figure>>>>(
      `${url}?pagination[page]=${page}`
    );
    promises.push(promise);
  }
  const responses = await Promise.all(promises);
  responses.forEach((res) =>
    figures.push(...res.data.data.map(flattenApiData))
  );
  return figures;
}

export const api = {
  getFigure,
  getFigures,
};
