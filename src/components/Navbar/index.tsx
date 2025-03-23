import {Link} from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className={'flex gap-8 border border-slate-300 p-3 rounded-b-lg'}>
      <Link to="/">Базовый пример</Link>
      <Link to="/withPagination">C пагинацией</Link>
      <Link to="/withScrollPagination">С бесконечной пагинацией на scroll</Link>
      <Link to="/create">Создание</Link>
    </nav>
  );
};
