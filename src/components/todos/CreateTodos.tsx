import cn from 'classnames';

import {useCreateTodos} from './hooks';
import {Todo} from './Todo';

export const CreateTodos = () => {
  const {todos, onSubmit, isPending} = useCreateTodos();

  return (
    <div className={cn('flex flex-col gap-4', {'opacity-50': isPending})}>
      <form className={'flex gap-3'} onSubmit={onSubmit}>
        <input
          type={'text'}
          name={'title'}
          className={'rounded p-2 border border-teal-500'}
        />
        <button
          disabled={isPending}
          type={'submit'}
          className={'rounded p-2 border border-teal-500'}
        >
          {'Создать'}
        </button>
      </form>
      <div>
        <h3 className={'font-bold'}>{'Последние 5 тудушек'}</h3>
        <div>{todos?.map((todo) => <Todo key={todo.id} todo={todo} />)}</div>
      </div>
    </div>
  );
};
