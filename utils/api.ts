import axios from "axios";

const apiUrl = process.env.API_URL;
const token = process.env.API_TOKEN;

export const api = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
