import { Link } from 'react-router-dom';
import { AppRoute, INITIAL_CATALOG_PAGE_URL_PARAMS } from '../../const';

function OrderFailed(): JSX.Element {
  return (
    <div data-testid="order-failed">
      <h1>Не удалось разместить заказ ;(</h1>
      <h2>Попробуйте позже</h2>
      <Link to={AppRoute.Catalog(INITIAL_CATALOG_PAGE_URL_PARAMS)}>Вернуться на главную</Link>
    </div>);
}

export default OrderFailed;
