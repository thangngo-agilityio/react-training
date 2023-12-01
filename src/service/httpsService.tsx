import { API_HEADERS, API_PATH_URL, HTTP_METHOD, MOCK } from "constants/common";


const fullPath = MOCK.API + API_PATH_URL.PRODUCT_URL

/**
 * @description Call api post data
 * @body {object} data
 * @returns data after request
 */
export const post = async <T, U>(data: T): Promise<U> => {
  try {
    const response = await fetch(fullPath, {
      method: HTTP_METHOD.POST,
      mode: "cors",
      cache: "no-cache",
      headers: API_HEADERS,
      body: JSON.stringify(data),
    });
    return response.json()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error
  }
};

/**
 * @description get data detail from server
 * @param {String} path request path
 * @query {filter, page, sortBy}
 * @returns data after request
 */
export const get = async <T extends Record<string, string | number | boolean>>(query?: string): Promise<T | T[]> => {
  try {
    const url = `${fullPath}?${query}`;
    const response = await fetch(url);
    return response.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error;
  }
};

/**
 * @description get data detail by id from server
 * @param {String} path request path
 * @param {Number} id
 * @returns data after request
 */
export const getById = async <T extends Record<string, string>>(id: string, query?: string): Promise<T> => {
  try {
    const url = `${fullPath}/${id}?${query}`;
    const response = await fetch(url);

    return response.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error
  }
}

/**
 * @description delete data at server
 * @param {String} path
 * @returns data after request
 */
export const deleteProduct = async (id: string): Promise<void> => {
  try {
    const response = await fetch(fullPath + `/${id}`, {
      method: HTTP_METHOD.DELETE,
    });
    return response.json()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error;
  }
};

/**
 * Call api put data
 * @param {String} path
 * @body {object} data
 */
export const put = async <T, U>(data: T, id: string): Promise<U> => {
  try {
    const response = await fetch(`${fullPath}/${id}`, {
      method: HTTP_METHOD.PUT,
      headers: API_HEADERS,
      body: JSON.stringify(data),
    });
    return response.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error;
  }
}
