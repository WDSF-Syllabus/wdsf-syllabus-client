import { ApiData } from "../model/interface/ApiData";

export function flattenApiData<T>({ id, attributes }: ApiData<T>) {
  return { id, ...attributes };
}
