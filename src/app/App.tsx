import {BrowserRouter, Routes, Route} from 'react-router'
import {TodosList} from '@components/Todos/TodosList'
import {TodosListWithPagination} from '@components/Todos/TodosListWithPagination'
import {AppWrapper} from './AppWrapper.tsx'

export const App = () => {
  return (
    <BrowserRouter>
      <AppWrapper>
        <Routes>
          <Route path="/" element={<TodosList />} />
        </Routes>
        <Routes>
          <Route path="/withPagination" element={<TodosListWithPagination />} />
        </Routes>
        <Routes>
          <Route path="/withScrollPagination" element={<TodosList />} />
        </Routes>
      </AppWrapper>
    </BrowserRouter>
  )
}
