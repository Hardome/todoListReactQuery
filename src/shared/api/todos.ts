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

  getAllTodosQueryOptions: () => {
    return queryOptions({
      queryKey: [todosApi.baseKey],
      queryFn: ({signal}) => {
        return API.request<TodoDto[]>('/todos', {config: {signal}});
      },
    });
  },

  getTodosQueryOptions: () => {
    return queryOptions({
      queryKey: [todosApi.baseKey, 'list'],
      queryFn: ({signal}) => {
        return API.request<TodoDto[]>('/todos', {config: {signal}});
      },
    });
  },

  getTodosWithPaginationQueryOptions: ({page}: {page: number}) => {
    return queryOptions({
      queryKey: [todosApi.baseKey, 'list', page],
      queryFn: async ({signal}) => {
        await delay();

        return API.request<PaginatedData<TodoDto[]>>(
          `/todos?_page=${page}&_per_page=10`,
          {config: {signal}}
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

        return API.request<PaginatedData<TodoDto[]>>(
          `/todos?_page=${pageParam}&_per_page=20`,
          {config: {signal}}
        );
      },
      placeholderData:
        keepPreviousData /* пока запрос будет в состоянии isPending, будут отобрадаться предыдущие данные */,
      initialPageParam: 1,
      getNextPageParam: (result) => result.next,
      select: (result) => result.pages.flatMap((page) => page.data),
    });
  },

  lastTodosQueryOptions: () => {
    return queryOptions({
      queryKey: [todosApi.baseKey, 'list', 'last'],
      queryFn: ({signal}) => {
        return API.request<TodoDto[]>('/todos?_sort=-id&_limit=5', {
          config: {signal},
        });
      },
      select: (result) =>
        result.map((result) => {
          return {
            ...result,
            id: Number(result.id),
          };
        }),
    });
  },

  createTodo: async ({title}: {title: TodoDto['title']}) => {
    const [lastTodo] = await API.request<TodoDto[]>(
      '/todos?_sort=-id&_limit=1'
    );

    await delay(300);

    return API.request<TodoDto>('/todos', {
      method: 'POST',
      body: {
        id: Number(lastTodo?.id) + 1,
        isDone: false,
        title,
      },
    });
  },

  deleteTodo: async ({id}: {id: TodoDto['id']}) => {
    await delay(300);

    return API.request<TodoDto>(`/todos/${id}`, {method: 'DELETE'});
  },

  updateTodo: async ({
    id,
    isDone,
  }: {
    id: TodoDto['id'];
    isDone: TodoDto['isDone'];
  }) => {
    await delay(300);

    return API.request<TodoDto>(`/todos/${id}`, {
      method: 'PATCH',
      body: {isDone},
    });
  },
};
