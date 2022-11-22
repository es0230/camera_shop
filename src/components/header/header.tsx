import { Link } from 'react-router-dom';
import { AppRoute, INITIAL_CATALOG_PAGE_URL_PARAMS } from '../../const';
import { useAppSelector } from '../../hooks';
import { selectBasket } from '../../store/user-data/selectors';
import BasketIcon from '../svg/basket-icon/basket-icon';
import LogoIcon from '../svg/logo-icon/logo-icon';
import SearchForm from './search-form/search-form';

function Header(): JSX.Element {
  const basketCount = useAppSelector(selectBasket).length;

  return (
    <header data-testid="header-component" className="header" id="header">
      <div className="container">
        <Link className="header__logo" to={AppRoute.Catalog(INITIAL_CATALOG_PAGE_URL_PARAMS)} aria-label="Переход на главную">
          <LogoIcon />
        </Link>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link className="main-nav__link" to={AppRoute.Catalog(INITIAL_CATALOG_PAGE_URL_PARAMS)}>Каталог</Link>
            </li>
            <li className="main-nav__item">
              <Link className="main-nav__link" to={AppRoute.Unknown()}>Гарантии</Link>
            </li>
            <li className="main-nav__item">
              <Link className="main-nav__link" to={AppRoute.Unknown()}>Доставка</Link>
            </li>
            <li className="main-nav__item">
              <Link className="main-nav__link" to={AppRoute.Unknown()}>О компании</Link>
            </li>
          </ul>
        </nav>
        <SearchForm />
        <Link className="header__basket-link" to={AppRoute.Unknown()}>
          <BasketIcon />
          <span className="header__basket-count">{basketCount}</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
