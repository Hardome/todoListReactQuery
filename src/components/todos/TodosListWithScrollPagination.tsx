import cn from 'classnames';

import {useTodoListWithScrollPagination} from './hooks';

import {Todo} from './Todo';

export const TodosListWithScrollPagination = () => {
  const {todos, isPlaceholderData, hasNextPage, isFetchingNextPage, cursorRef} =
    useTodoListWithScrollPagination();

  return (
    <div
      className={cn('flex flex-col gap-4 pb-80', {
        'opacity-50': isPlaceholderData,
      })}
    >
      <h3 className={'font-bold'}>{'TodosListWithPagination'}</h3>
      <div>{todos?.map((todo) => <Todo key={todo.id} todo={todo} />)}</div>
      <div className={'flex gap-2'} ref={cursorRef}>
        {!hasNextPage && <span>{'Нет данных для загрузки'}</span>}
        {isFetchingNextPage && <span>{'Загрузка...'}</span>}
      </div>
    </div>
  );
};
