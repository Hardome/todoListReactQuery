import {useQuery} from '@tanstack/react-query';
import {todosApi} from '@api/todos';
import {useState} from 'react';

const FIRST_PAGE = 1;

export function useTodoListWithPagination() {
  const [page, setPage] = useState(FIRST_PAGE);

  const {data, isPending, isPlaceholderData} = useQuery({
    ...todosApi.getTodosWithPaginationQueryOptions({page}),
  });

  return {...data, todos: data?.data, isPending, setPage, isPlaceholderData};
}
