import {todosApi} from '@api/todos';
import cn from 'classnames';

export const TestPage = () => {
  return (
    <div className={cn('flex gap-4 w-fit px-4 py-2')}>
      <button
        type={'button'}
        className={'rounded p-2 border border-teal-500 rounded-md transition-all duration-100 ease-in-out hover:bg-primary-900'}
        // onClick={() => todosApi.createUser()}
      >
        {'asd'}
      </button>
    </div>
  );
};
