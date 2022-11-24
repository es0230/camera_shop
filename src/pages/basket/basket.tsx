import { Link } from 'react-router-dom';
import BasketModal from '../../components/basket/bakset-modal/basket-modal';
import BasketList from '../../components/basket/basket-list/basket-list';
import BasketSummary from '../../components/basket/basket-summary/basket-summary';
import PurchaseModal from '../../components/basket/purchase-modal/purchase-modal';
import { AppRoute, INITIAL_CATALOG_PAGE_URL_PARAMS } from '../../const';
import { useAppSelector } from '../../hooks';
import { selectCamerasInBasket, selectTotalPrice } from '../../store/user-data/selectors';

function Basket(): JSX.Element {
  const totalPrice = useAppSelector(selectTotalPrice);
  const camerasInBasket = useAppSelector(selectCamerasInBasket);

  return (
    <main>
      <div className="page-content">
        <div className="breadcrumbs">
          <div className="container">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link className="breadcrumbs__link" to={AppRoute.Catalog(INITIAL_CATALOG_PAGE_URL_PARAMS)}>Главная
                  <svg width="5" height="8" aria-hidden="true">
                    <use xlinkHref="#icon-arrow-mini" />
                  </svg>
                </Link>
              </li>
              <li className="breadcrumbs__item">
                <Link className="breadcrumbs__link" to={AppRoute.Catalog(INITIAL_CATALOG_PAGE_URL_PARAMS)}>Каталог
                  <svg width="5" height="8" aria-hidden="true">
                    <use xlinkHref="#icon-arrow-mini" />
                  </svg>
                </Link>
              </li>
              <li className="breadcrumbs__item">
                <span className="breadcrumbs__link breadcrumbs__link--active">Корзина</span>
              </li>
            </ul>
          </div>
        </div>
        <section className="basket">
          <div className="container">
            <h1 className="title title--h2">Корзина</h1>
            <BasketList cameras={camerasInBasket} />
            <BasketSummary totalPrice={totalPrice} />
          </div>
        </section>
      </div>
      <BasketModal />
      <PurchaseModal />
    </main>
  );
}

export default Basket;
