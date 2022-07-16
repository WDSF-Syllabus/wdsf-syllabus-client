import axios, { AxiosResponse } from "axios";

import { Figure } from "../model/interface/Figure";
import { ApiResponseWithMeta } from "../model/interface/ApiResponseWithMeta";
import { mapper } from "./mapper";
import { FigureApiResponse } from "../model/interface/FigureApiResponse";
import { ApiData } from "../model/interface/ApiData";
import { FigurePreview } from "../model/type/FigurePreview";
import { flattenApiData } from "./flattenApiData";

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
  const response = await http.get<ApiResponseWithMeta<FigureApiResponse>>(url);
  return mapper.fromFigureApiResponseToFigure(response.data.data);
}

type FigurePreviewResponse = ApiResponseWithMeta<Array<ApiData<FigurePreview>>>;

async function getFigurePreviews(): Promise<Array<FigurePreview>> {
  const path = "/figures";
  const figurePreviews: Array<FigurePreview> = [];

  const params = new URLSearchParams();
  params.append("pagination[pageSize]", "100"); // 100 is the max page size for the strapi API
  params.append("pagination[page]", "1");
  params.append("fields", "name");
  params.append("fields", "slug");

  const response = await http.get<FigurePreviewResponse>(path, { params });
  figurePreviews.push(...response.data.data.map(flattenApiData));
  const pageCount = response.data.meta.pagination.pageCount;

  const promises: Array<Promise<AxiosResponse<FigurePreviewResponse>>> = [];

  for (let page = 2; page <= pageCount; page++) {
    params.set("pagination[page]", String(page));
    const promise = http.get<FigurePreviewResponse>(path, { params });
    promises.push(promise);
  }

  const responses = await Promise.all(promises);
  for (const res of responses) {
    figurePreviews.push(...res.data.data.map(flattenApiData));
  }

  return figurePreviews;
}

// only the endpoint for fetching single figures by slug is correctly configured
// in the strapi API to return all nested data, therefore we first have to get
// all slugs and then use them to fetch the full data
async function getFigures(): Promise<Array<Figure>> {
  const figurePreviews = await getFigurePreviews();

  const promises: Array<Promise<Figure>> = [];
  for (const figurePreview of figurePreviews) {
    promises.push(getFigure(figurePreview.slug));
  }

  return Promise.all(promises);
}

export const api = {
  getFigure: getFigure,
  getFigures: getFigures,
  getFigurePreviews: getFigurePreviews,
};
