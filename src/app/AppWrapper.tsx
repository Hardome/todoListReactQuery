import {ReactNode} from 'react';
import {QueryClientProvider} from '@tanstack/react-query';

import {queryClient} from '../shared/queryClient';
import {Navbar} from '../components/Navbar';
import './App.css';

export const AppWrapper = ({children}: {children: ReactNode}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={'flex flex-col gap-4 items-center'}>
        <Navbar />
        {children}
      </div>
    </QueryClientProvider>
  );
};
