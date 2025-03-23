import {useQuery} from '@tanstack/react-query'

import {API} from '../../shared/api/instance'
import {todosApi, TodoDto} from '../../shared/api'
import {Todo} from './Todo'

export const TodosList = () => {
  const {data: todos, isPending} = useQuery({
    queryKey: [todosApi.baseKey, 'list'],
    queryFn: ({signal}) => {
      return API.get<TodoDto[]>('/todos', {
        signal,
      })
    },
  })

  if (isPending) {
    return <div>Loading...</div>
  }

  return (
    <div className={'flex flex-col'}>
      <h3 className={'font-bold'}>TodosList</h3>
      <div>{todos?.map((todo) => <Todo todo={todo} />)}</div>
    </div>
  )
}
