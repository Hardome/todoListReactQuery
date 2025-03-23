import {useQuery} from '@tanstack/react-query'
import {todosApi} from '../api'

export function useTodoList() {
  const {data, isPending} = useQuery({
    ...todosApi.getTodosQueryOptions(),
  })

  return {todos: data, isPending}
}
