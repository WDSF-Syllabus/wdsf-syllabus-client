interface Timestamps {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface ApiData<T> {
  id: string;
  attributes: Omit<T, "id"> & Timestamps;
}
