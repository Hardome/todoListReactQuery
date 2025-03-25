import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {todosApi, TodoDto} from '@api/todos';
import {API} from '@api';

const lastTodosQueryOptions = queryOptions({
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

export function useCreateTodos() {
  const queryClient = useQueryClient();

  const {data: todos} = useQuery({...lastTodosQueryOptions});

  const createTodoMutation = useMutation({
    mutationFn: todosApi.createTodo,
    // async onSettled() { /* выполнится в любом случае */
    //   await queryClient.invalidateQueries({...lastTodosQueryOptions});
    // },
    async onSuccess() {
      /* выполнится только при успешном запросе */
      await queryClient.invalidateQueries({...lastTodosQueryOptions});
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); /* отключает дефолтное поведение формы (не будет перезагрузки старницы) */

    const formData = new FormData(e.currentTarget);
    const title = String(formData.get('title') ?? '');

    createTodoMutation.mutate({
      title,
    });

    e.currentTarget.reset();
  };

  return {isPending: createTodoMutation.isPending, todos, onSubmit};
}
