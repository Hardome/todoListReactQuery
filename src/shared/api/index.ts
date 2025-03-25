import axios, {Method, AxiosRequestConfig} from 'axios';

const API_URL = 'http://localhost:3000/';

const baseQuery = axios.create({
  baseURL: API_URL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const API = {
  request: async <T>(
    url: string,
    method: Method = 'GET',
    body?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    try {
      const {data} = await baseQuery({
        method,
        url,
        data: body,
        ...config,
      });

      return data as T;
    } catch (error) {
      console.error(`API ${method} Error:`, error);

      throw error;
    }
  },
};