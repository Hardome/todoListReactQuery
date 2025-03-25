import {
  infiniteQueryOptions,
  keepPreviousData,
  queryOptions,
} from '@tanstack/react-query';
import {API} from '.';
import {delay} from './delay';

export type TodoDto = {
  id: number;
  title: string;
  isDone: boolean;
};

type PaginatedData<T> = {
  data: T;
  first: number;
  last: number;
  items: number;
  pages: number;
  next: number | null;
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
        });
      },
    });
  },

  getTodosWithPaginationQueryOptions: ({page}: {page: number}) => {
    return queryOptions({
      queryKey: [todosApi.baseKey, 'list', {page}],
      queryFn: async ({signal}) => {
        await delay();

        return API.get<PaginatedData<TodoDto[]>>(
          `/todos?_page=${page}&_per_page=10`,
          {
            signal,
          }
        );
      },
      placeholderData:
        keepPreviousData /* пока запрос будет в состоянии isPending, будут отобрадаться предыдущие данные */,
    });
  },

  getTodosWithInfinityPaginationQueryOptions: () => {
    return infiniteQueryOptions({
      queryKey: [todosApi.baseKey, 'list', 'scroll'],
      queryFn: async ({signal, pageParam}) => {
        await delay(300);

        return API.get<PaginatedData<TodoDto[]>>(
          `/todos?_page=${pageParam}&_per_page=20`,
          {
            signal,
          }
        );
      },
      placeholderData:
        keepPreviousData /* пока запрос будет в состоянии isPending, будут отобрадаться предыдущие данные */,
      initialPageParam: 1,
      getNextPageParam: (result) => result.next,
      select: (result) => result.pages.flatMap((page) => page.data),
    });
  },

  createTodo: async ({title}: {title: TodoDto['title']}) => {
    const [lastTodo] = await API.get<TodoDto[]>('/todos?_sort=-id&_limit=1');

    await delay(300);

    return API.post<TodoDto>('/todos', {
      id: Number(lastTodo?.id) + 1,
      isDone: false,
      title,
    });
  },

  deleteTodo: async ({id}: {id: TodoDto['id']}) => {
    await delay(300);

    return API.delete<TodoDto>(`/todos/${id}`);
  },
};
