import {useQuery} from '@tanstack/react-query';

import {API} from '@api';
import {TodoDto, todosApi} from '@api/todos';

import {Todo} from './Todo';

const listQueryKey = [todosApi.baseKey, 'list'];

export const TodosList = () => {
  const {data: todos, isPending} = useQuery({
    queryKey: listQueryKey,
    queryFn: ({signal}) => {
      return API.request<TodoDto[]>('/todos', {config: {signal}});
    },
  });

  // const {todos, isPending} = useTodoList();

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div className={'flex flex-col'}>
      <h3 className={'font-bold'}>{'TodosList'}</h3>
      <div>
        {todos?.map((todo) => (
          <Todo key={todo.id} todo={todo} listQueryKey={listQueryKey} />
        ))}
      </div>
    </div>
  );
};
