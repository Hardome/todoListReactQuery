import {useQuery} from '@tanstack/react-query';
import {todosApi} from '@api/todos';

export const useTodoList = () => {
  const {data, isPending} = useQuery(todosApi.getTodosQueryOptions());

  return {todos: data, isPending};
};
