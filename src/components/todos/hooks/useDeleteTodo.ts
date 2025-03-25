import {useMutation, useQueryClient} from '@tanstack/react-query';
import {todosApi} from '@api/todos';

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  const deleteTodoMutation = useMutation({
    mutationFn: todosApi.deleteTodo,
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: [
          todosApi.baseKey,
        ] /* инвалидируем все списки тудушек по основному ключу */,
      });
    },
  });

  return {
    isPending: deleteTodoMutation.isPending,
    onDelete: deleteTodoMutation.mutate,
  };
};
