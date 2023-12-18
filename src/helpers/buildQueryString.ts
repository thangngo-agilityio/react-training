import { AllowedQueryKeys, QueryParamsType } from 'types';

/**
 *
 * @param params params query string
 * @returns {string}
 */
export const queryParams = <T extends Record<string, string | number | boolean>>(
  params: QueryParamsType<T>
): string => {
  const queryString = Object.keys(params)
    .filter((key) => !!params[key as AllowedQueryKeys<T>])
    .map((key) => `${key}=${params[key as AllowedQueryKeys<T>]}`)
    .join('&');

  return queryString;
};
