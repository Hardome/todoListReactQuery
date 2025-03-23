import {useQuery} from '@tanstack/react-query'
import {todosApi} from '../api'
import {useState} from 'react'

export function useTodoListWithPagination() {
  const [page, setPage] = useState(1)

  const {data, isPending, isPlaceholderData} = useQuery({
    ...todosApi.getTodosWithPaginationQueryOptions({page}),
  })

  return {...data, todos: data?.data, isPending, setPage, isPlaceholderData}
}
