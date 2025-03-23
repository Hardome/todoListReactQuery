import {useInfiniteQuery} from '@tanstack/react-query'
import {todosApi} from '../api'

export function useTodoListWithScrollPagination() {
  const {data, isPending, isPlaceholderData, hasNextPage, isFetchingNextPage, fetchNextPage} = useInfiniteQuery({
    ...todosApi.getTodosWithInfinityPaginationQueryOptions(),
  })

  return {...data, todos: data, isPending, isPlaceholderData, hasNextPage, isFetchingNextPage, fetchNextPage}
}
