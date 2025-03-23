import {useQuery} from '@tanstack/react-query';

import {API, todosApi, TodoDto} from '@api';
// import { useTodoList } from '@hooks/useTodoList'

import {Todo} from './Todo';

export const TodosList = () => {
  const {data: todos, isPending} = useQuery({
    queryKey: [todosApi.baseKey, 'list'],
    queryFn: ({signal}) => {
      return API.get<TodoDto[]>('/todos', {
        signal,
      });
    },
  });

  // const {todos, isPending} = useTodoList();

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div className={'flex flex-col'}>
      <h3 className={'font-bold'}>{'TodosList'}</h3>
      <div>{todos?.map((todo) => <Todo key={todo.id} todo={todo} />)}</div>
    </div>
  );
};
