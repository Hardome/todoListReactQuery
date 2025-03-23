import {queryOptions} from '@tanstack/react-query'
import {API} from './instance'

export type TodoDto = {
  id: number
  title: string
  isDone: boolean
}

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
}
