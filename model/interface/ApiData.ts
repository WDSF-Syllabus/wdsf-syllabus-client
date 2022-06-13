export interface ApiData<T> {
  id: string;
  attributes: Omit<T, "id">;
}
