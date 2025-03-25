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

type TApiParams = {
  method?: Method;
  body?: unknown;
  config?: AxiosRequestConfig;
};

export const API = {
  request: async <T>(url: string, params: TApiParams = {}): Promise<T> => {
    const {method = 'GET', body, config} = params;

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
