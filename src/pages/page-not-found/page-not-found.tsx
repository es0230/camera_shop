import { Link } from 'react-router-dom';
import { AppRoute, INITIAL_PAGE } from '../../const';

function PageNotFound(): JSX.Element {
  return (
    <>
      <h1>Страница не найдена</h1>
      <Link to={AppRoute.Catalog(INITIAL_PAGE)}>Вернуться на главную</Link>
    </>);
}

export default PageNotFound;
