import { ApiData } from "../model/interface/ApiData";

export function flattenApiData<T>({ id, attributes }: ApiData<T>) {
  const { createdAt, updatedAt, publishedAt, ...rest } = attributes;
  return { id, ...rest };
}
