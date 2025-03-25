import cn from 'classnames';

import {TodoDto} from '@api/todos';

import {useDeleteTodo, useUpdateTodo} from './hooks';

export const Todo = ({
  todo,
  listQueryKey,
}: {
  todo: TodoDto;
  listQueryKey?: string[];
}) => {
  const {id, title, isDone} = todo;

  const {onDelete, isPending} = useDeleteTodo(listQueryKey);
  const onUpdate = useUpdateTodo();

  return (
    <div
      className={cn(
        'flex gap-4 w-fit px-4 py-2 rounded-md items-center border mb-4',
        {
          ['bg-green-100']: isDone,
        }
      )}
    >
      <span>{id}</span>
      <span>{title}</span>
      <button
        className={
          'text-green-500 font-bold hover:text-green-700 hover:cursor-pointer'
        }
        onClick={() => onUpdate(id, !isDone)}
      >
        {'Переключить состояние'}
      </button>
      <button
        className={cn(
          'text-rose-500 font-bold hover:text-rose-700 hover:cursor-pointer',
          {'opacity-50': isPending}
        )}
        disabled={isPending}
        onClick={() => onDelete({id})}
      >
        {'Удалить'}
      </button>
    </div>
  );
};
