import { Link } from 'react-router-dom';
import { AppRoute, INITIAL_CATALOG_PAGE_URL_PARAMS } from '../../const';

function PageNotFound(): JSX.Element {
  return (
    <div data-testid="page-not-found">
      <h1>Страница не найдена</h1>
      <Link to={AppRoute.Catalog(INITIAL_CATALOG_PAGE_URL_PARAMS)}>Вернуться на главную</Link>
    </div>);
}

export default PageNotFound;
