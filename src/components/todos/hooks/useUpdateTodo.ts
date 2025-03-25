import {useMutation, useQueryClient} from '@tanstack/react-query';
import {TodoDto, todosApi} from '@api/todos';

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  const updateTodoMutation = useMutation({
    mutationFn: todosApi.updateTodo,
    /* optimistic update */
    /* обновление происходит сразу не дожидаясь получения успешного ответа от сервера */
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({
        queryKey: [todosApi.baseKey],
      });

      const previousTodos = queryClient.getQueryData(
        todosApi.getTodosQueryOptions().queryKey
      );

      queryClient.setQueryData(
        todosApi.getTodosQueryOptions().queryKey,
        (old) =>
          old?.map((todo) =>
            todo.id === newTodo.id ? {...todo, ...newTodo} : todo
          )
      );

      return {previousTodos};
    },
    /* при неуспешном ответе от сервера откатываем изменения из контекста */
    onError: (_, __, context) => {
      if (context) {
        queryClient.setQueryData(
          todosApi.getTodosQueryOptions().queryKey,
          context.previousTodos
        );
      }
    },
    /* инвалидируем все списки тудушек по основному ключу в фоне (нет await) */
    onSettled() {
      queryClient.invalidateQueries({queryKey: [todosApi.baseKey]});
    },
  });

  const updateTodo = (id: TodoDto['id'], isDone: TodoDto['isDone']) => {
    updateTodoMutation.mutate({
      id,
      isDone,
    });
  };

  return updateTodo;
};
