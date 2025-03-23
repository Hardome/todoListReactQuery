import {Link} from 'react-router-dom'

export const Navbar = () => {
  return (
    <nav className={'flex gap-8'}>
      <Link to="/">Базовый пример</Link>
      <Link to="/withPagination">C пагинацией</Link>
      <Link to="/withScrollPagination">С пагинацией на scroll</Link>
    </nav>
  )
}
