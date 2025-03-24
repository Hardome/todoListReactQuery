import cn from 'classnames';

import {TodoDto} from '@api/todos';

import { useDeleteTodo } from './hooks';

export const Todo = ({todo}: {todo: TodoDto}) => {
  const {id, title, isDone} = todo;

  const {onDelete, isPending} = useDeleteTodo();

  return (
    <div
      className={cn('flex gap-4 w-fit px-4 py-2 rounded-md items-center', {
        ['bg-green-300']: isDone
      })}
    >
      <span>{id}</span>
      <span>{title}</span>
      <button className={'hover:bg-sky-700 hover:cursor-pointer'}>{'Переключить состояние'}</button>
      <button className={cn('bg-red-300 rounded-md p-1 hover:bg-sky-700 hover:cursor-pointer', {'opacity-50': isPending})} onClick={() => onDelete({id})} disabled={isPending}>{'Удалить'}</button>
    </div>
  );
};
