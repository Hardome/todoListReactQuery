import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {todosApi} from '@api/todos';

const queryOptions = todosApi.lastTodosQueryOptions();

export function useCreateTodos() {
  const queryClient = useQueryClient();

  const {data: todos} = useQuery(queryOptions);

  const createTodoMutation = useMutation({
    mutationFn: todosApi.createTodo,
    /* выполнится в любом случае */
    // async onSettled() {
    //   await queryClient.invalidateQueries({...lastTodosQueryOptions});
    // },
    /* выполнится только при успешном запросе */
    async onSuccess() {
      await queryClient.invalidateQueries(queryOptions);
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    /* отключает дефолтное поведение формы (не будет перезагрузки старницы) */
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = String(formData.get('title') ?? '');

    createTodoMutation.mutate({
      title,
    });

    e.currentTarget.reset();
  };

  return {isPending: createTodoMutation.isPending, todos, onSubmit};
}
