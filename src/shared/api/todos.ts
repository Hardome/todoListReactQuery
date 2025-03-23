import {
  infiniteQueryOptions,
  keepPreviousData,
  queryOptions,
} from '@tanstack/react-query';
import {API} from './instance';

export type TodoDto = {
  id: number;
  title: string;
  isDone: boolean;
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
        });
      },
    });
  },

  getTodosWithPaginationQueryOptions: ({page}: {page: number}) => {
    return queryOptions({
      queryKey: [todosApi.baseKey, 'list', {page}],
      queryFn: async ({signal}) => {
        await new Promise((res) => setTimeout(res, 500));

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
        await new Promise((res) => setTimeout(res, 300));

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

    await new Promise((res) => setTimeout(res, 300));

    // const a = await API.post<TodoDto>('/todos', {
    //   id: lastTodo?.id + 1,
    //   isDone: false,
    //   title,
    // });

    const a = await fetch('http://localhost:3000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Accept: 'application/json',
      },
      body: JSON.stringify({
        id: lastTodo?.id + 1,
        isDone: false,
        title,
      })
    })

    console.log('После API.post', a);

    // debugger; 
  },
};
