import {queryOptions} from '@tanstack/react-query'
import {API} from './instance'

export type TodoDto = {
  id: number
  title: string
  isDone: boolean
};

type PaginatedData<T> = {
  data: T;
  first: number;
  items: number;
  last: number;
  next: number | null;
  pages: number;
  prev: number | null;
};

export const todosApi = {
  baseKey: 'todos',

  getTodosQueryOptions: () => {
    return queryOptions({
      queryKey: [todosApi.baseKey, 'list'],
      queryFn: ({signal}) => {
        return API.get<TodoDto[]>('/todos', {
          signal,
        })
      },
    })
  },

  getTodosWithPaginationQueryOptions: ({page}: {page: number}) => {
    return queryOptions({
      queryKey: [todosApi.baseKey, 'list', {page}],
      queryFn: async({signal}) => {
        await new Promise((res) => setTimeout(res, 500));

        return API.get<PaginatedData<TodoDto[]>>(`/todos?_page=${page}&_per_page=10`, {
          signal,
        })
      },
    })
  },
}
