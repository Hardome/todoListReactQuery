import cn from 'classnames';

import {TodoDto} from '@api';

export const Todo = ({todo}: {todo: TodoDto}) => {
  const {id, title, isDone} = todo;

  return (
    <div
      className={cn('flex gap-4 w-fit px-4 py-2 rounded-md', {
        ['bg-green-300']: isDone,
      })}
    >
      <span>{id}</span>
      <span>{title}</span>
    </div>
  );
};
