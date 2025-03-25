import {useInfiniteQuery} from '@tanstack/react-query';
import {todosApi} from '@api/todos';
import {useCallback, useRef} from 'react';

const useIntersectLoading = (onIntersect: () => void) => {
  const unsubscribe = useRef(() => {});

  return useCallback(
    (el: HTMLDivElement | null) => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((intersection) => {
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
    },
    [onIntersect]
  );
};

export function useTodoListWithScrollPagination() {
  const {
    data,
    isPending,
    isPlaceholderData,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery(todosApi.getTodosWithInfinityPaginationQueryOptions());

  const cursorRef = useIntersectLoading(() => fetchNextPage());

  return {
    ...data,
    todos: data,
    isPending,
    isPlaceholderData,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    cursorRef,
  };
}
