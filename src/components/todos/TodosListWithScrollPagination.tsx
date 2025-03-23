import cn from 'classnames';

import {useTodoListWithScrollPagination} from '@hooks'

import {Todo} from './Todo'
import { useCallback, useRef } from 'react';

const useIntersectLoading = (onIntersect: () => void) => {
  const unsubscribe = useRef(() => {});
 
   return useCallback((el: HTMLDivElement | null) => {
     const observer = new IntersectionObserver(entries => {
       entries.forEach(intersection => {
         if (intersection.isIntersecting) {
           onIntersect();
         }
       });
     });
 
     if (el) {
       observer.observe(el);
       unsubscribe.current = () => observer.disconnect();
     } else {
       unsubscribe.current();
     }
   }, [onIntersect]);
}

export const TodosListWithScrollPagination = () => {
  const {todos, isPlaceholderData, hasNextPage, isFetchingNextPage, fetchNextPage} = useTodoListWithScrollPagination();

  const cursorRef = useIntersectLoading(() => fetchNextPage());

  return (
    <div className={cn('flex flex-col gap-4', {'opacity-50': isPlaceholderData})}>
      <h3 className={'font-bold'}>{'TodosListWithPagination'}</h3>
      <div>{todos?.map((todo) => <Todo key={todo.id} todo={todo} />)}</div>
      <div className={'flex gap-2'} ref={cursorRef}>
        {!hasNextPage && <span>{'Нет данных для загрузки'}</span>}
        {isFetchingNextPage && <span>{'Загрузка...'}</span>}
      </div>
    </div>
  )
}
