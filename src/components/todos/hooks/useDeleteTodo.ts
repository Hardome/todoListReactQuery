import {useMutation, useQueryClient} from '@tanstack/react-query';
import {TodoDto, todosApi} from '@api/todos';

export const useDeleteTodo = (queryKey?: string[]) => {
  const queryClient = useQueryClient();

  const deleteTodoMutation = useMutation({
    mutationFn: todosApi.deleteTodo,
    /* инвалидируем все списки тудушек по основному ключу в фоне (нет await) */
    async onSettled() {
      queryClient.invalidateQueries({queryKey: [todosApi.baseKey]});
    },
    /* pessimistic update */
    /* обновление происходит только после получения успешного ответа от сервера */
    onSuccess(_, {id: deletedId}) {
      if (!queryKey) {
        return;
      }

      const todos = queryClient.getQueryData(queryKey) as TodoDto[] | undefined;

      if (todos) {
        const filteredTodos = todos.filter(
          ({id}) => Number(id) !== Number(deletedId)
        );

        queryClient.setQueryData(queryKey, filteredTodos);
      }
    },
  });

  return {
    isPending: deleteTodoMutation.isPending,
    onDelete: deleteTodoMutation.mutate,
  };
};
