import { Link } from 'react-router-dom';
import { AppRoute, INITIAL_PAGE, SortOrder, SortType } from '../../const';

function PageNotFound(): JSX.Element {
  return (
    <div data-testid="page-not-found">
      <h1>Страница не найдена</h1>
      <Link to={AppRoute.Catalog(INITIAL_PAGE, SortType.Price, SortOrder.Ascending)}>Вернуться на главную</Link>
    </div>);
}

export default PageNotFound;
