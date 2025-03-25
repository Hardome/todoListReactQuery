import axios from 'axios';

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
  post: <T>(url: string, body?: unknown) =>
    baseQuery
      .post(url, body)
      .then(({data}) => data as T)
      .catch((error) => {
        console.error('API POST Error:', error);

        throw error;
      }),

  delete: <T>(url: string) =>
    baseQuery
      .delete(url)
      .then(({data}) => data as T)
      .catch((error) => {
        console.error('API POST Error:', error);

        throw error;
      }),

  get: <T>(url: string, config?: {signal?: AbortSignal}) =>
    baseQuery
      .get(url, {...config})
      .then(({data}) => data as T)
      .catch((error) => {
        console.error('API GET Error:', error);

        throw error;
      }),
};
