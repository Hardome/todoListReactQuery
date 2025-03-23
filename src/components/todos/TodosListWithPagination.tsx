import cn from 'classnames';

import {useTodoListWithPagination} from '@hooks'

import {Todo} from './Todo'

export const TodosListWithPagination = () => {
  const {todos, pages, isPending, setPage, isPlaceholderData} = useTodoListWithPagination()

  /* при использовании placeholderData isPending будет всегда false*/
  // if (isPending) {
  //   return <div>Loading...</div>
  // }

  return (
    <div className={cn('flex flex-col gap-4', {'opacity-50': isPlaceholderData})}>
      <h3 className={'font-bold'}>{'TodosListWithPagination'}</h3>
      <div>{todos?.map((todo) => <Todo key={todo.id} todo={todo} />)}</div>
      <div className={'flex gap-2'}>
        <button
          className={'p-3 rounded border border-teal-500'}
          onClick={() => setPage((page) => Math.max(page - 1, 1))}
        >
          {'Предыдущая страница'}
        </button>
        <button
          className={'p-3 rounded border border-teal-500'}
          onClick={() => setPage((page) => Math.min(page + 1, pages!))}
        >
          {'Следующая страница'}
        </button>
      </div>
    </div>
  )
}
