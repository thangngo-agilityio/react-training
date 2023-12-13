export type QueryParamsType<T extends Record<string, string | number | boolean>> = {
  page: number;
  limit: number;
  sortBy: string;
  name: string;
} & T


export type AllowedQueryKeys<T extends Record<string, string | number | boolean>> =
  keyof QueryParamsType<T>

