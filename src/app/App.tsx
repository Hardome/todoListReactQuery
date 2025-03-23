import {BrowserRouter, Routes, Route} from 'react-router'
import {TodosList} from '@components/Todos/TodosList'
import {TodosListWithPagination} from '@components/Todos/TodosListWithPagination'
import { TodosListWithScrollPagination } from '@components/Todos/TodosListWithScrollPagination'
import {AppWrapper} from './AppWrapper.tsx'

export const App = () => {
  return (
    <BrowserRouter>
      <AppWrapper>
        <Routes>
          <Route path="/" element={<TodosList />} />
          <Route path="/withPagination" element={<TodosListWithPagination />} />
          <Route path="/withScrollPagination" element={<TodosListWithScrollPagination />} />
        </Routes>
      </AppWrapper>
    </BrowserRouter>
  )
}
