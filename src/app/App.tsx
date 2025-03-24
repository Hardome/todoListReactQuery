import {BrowserRouter, Routes, Route} from 'react-router';
import {AppWrapper} from './AppWrapper.tsx';
import {
  CreateTodos,
  TestPage,
  TodosList,
  TodosListWithPagination,
  TodosListWithScrollPagination,
} from '@components';

export const App = () => {
  return (
    <BrowserRouter>
      <AppWrapper>
        <Routes>
          <Route path="/" element={<TodosList />} />
          <Route path="/withPagination" element={<TodosListWithPagination />} />
          <Route
            path="/withScrollPagination"
            element={<TodosListWithScrollPagination />}
          />
          <Route path="/create" element={<CreateTodos />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </AppWrapper>
    </BrowserRouter>
  );
};
