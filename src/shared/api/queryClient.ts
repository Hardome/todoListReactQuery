import {QueryClient} from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime:
        2 *
        60 *
        1_000 /* 2 минуты запросы считаются не устаревшими и не совершается их refetch */,
    },
  },
});
