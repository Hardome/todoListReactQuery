import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router'
import {TodosList} from '../components/todos/index.tsx'
import {AppWrapper} from './AppWrapper.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AppWrapper>
        <Routes>
          <Route path="/" element={<TodosList />} />
        </Routes>
        <Routes>
          <Route path="/withPagination" element={<TodosList />} />
        </Routes>
        <Routes>
          <Route path="/withScrollPagination" element={<TodosList />} />
        </Routes>
      </AppWrapper>
    </BrowserRouter>
  </StrictMode>
)
