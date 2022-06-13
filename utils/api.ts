import axios from "axios";

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
  const response = await http.get<ApiResponse<Array<ApiData<Figure>>>>(url);
  return response.data.data.map(flattenApiData);
}

export const api = {
  getFigure,
  getFigures,
};
