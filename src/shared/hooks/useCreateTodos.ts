import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {API, TodoDto, todosApi} from '../api';

export function useCreateTodos() {
  const queryClient = useQueryClient();

  const {data} = useQuery({
    queryKey: [todosApi.baseKey, 'list'],
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
    // async onSettled() {
      // await queryClient.invalidateQueries({
      //   queryKey: [todosApi.baseKey, 'list'],
      // });
    // },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); /* отключает дефолтное поведение (не будет перезагрузки старницы) */
    const formData = new FormData(e.currentTarget);
    const title = String(formData.get('title') ?? '');

    createTodoMutation.mutate({
      title,
    });

    e.currentTarget.reset();

    console.log('asd')
  };

  return {isPending: createTodoMutation.isPending, todos: data, onSubmit};
}
