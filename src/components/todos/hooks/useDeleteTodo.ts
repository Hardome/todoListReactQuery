import {useMutation, useQueryClient} from '@tanstack/react-query';
import {todosApi} from '@api/todos';

const lastTodosQueryKey = todosApi.lastTodosQueryOptions().queryKey;

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  const deleteTodoMutation = useMutation({
    mutationFn: todosApi.deleteTodo,
    /* инвалидируем все списки тудушек по основному ключу в фоне (нет await) */
    async onSettled() {
      queryClient.invalidateQueries({
        queryKey: [todosApi.baseKey],
      });
    },
    /* pessimistic update */
    /* обновление происходит только после получения успешного ответа от сервера */
    onSuccess(_, {id: deletedId}) {
      const todos = queryClient.getQueryData(lastTodosQueryKey);

      if (todos) {
        const filteredTodos = todos.filter(({id}) => {
          console.log({id: Number(id), deletedId});

          return Number(id) !== deletedId;
        });

        queryClient.setQueryData(lastTodosQueryKey, filteredTodos);
      }
    },
  });

  return {
    isPending: deleteTodoMutation.isPending,
    onDelete: deleteTodoMutation.mutate,
  };
};
