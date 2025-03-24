import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {todosApi, TodoDto} from '@api/todos';
import {API} from '@api';

export function useCreateTodos() {
  const queryClient = useQueryClient();

  const {data} = useQuery({
    queryKey: [todosApi.baseKey, 'list', 'last'],
    queryFn: ({signal}) => {
      return API.get<TodoDto[]>('/todos?_sort=-id&_limit=5', {
        signal,
      });
    },
    select: (result) =>
      result.map((result) => {
        return {
          ...result,
          id: Number(result.id),
        };
      }),
  });

  const createTodoMutation = useMutation({
    mutationFn: todosApi.createTodo,
    async onSettled() {
      await queryClient.invalidateQueries({
        queryKey: [todosApi.baseKey, 'list', 'last'],
      });
    },
    mutationKey: [todosApi.baseKey],
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); /* отключает дефолтное поведение (не будет перезагрузки старницы) */

    const formData = new FormData(e.currentTarget);
    const title = String(formData.get('title') ?? '');

    createTodoMutation.mutate({
      title,
    });

    e.currentTarget.reset();
  };

  return {isPending: createTodoMutation.isPending, todos: data, onSubmit};
}
