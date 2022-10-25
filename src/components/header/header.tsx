import { Link } from 'react-router-dom';
import { AppRoute, INITIAL_PAGE, SortOrder, SortType } from '../../const';
import BasketIcon from '../svg/basket-icon/basket-icon';
import LogoIcon from '../svg/logo-icon/logo-icon';
import SearchForm from './search-form/search-form';

function Header(): JSX.Element {
  return (
    <header data-testid="header-component" className="header" id="header">
      <div className="container">
        <Link className="header__logo" to={AppRoute.Catalog(INITIAL_PAGE, SortType.Price, SortOrder.Ascending)} aria-label="Переход на главную">
          <LogoIcon />
        </Link>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link className="main-nav__link" to={AppRoute.Catalog(INITIAL_PAGE, SortType.Price, SortOrder.Ascending)}>Каталог</Link>
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
        </Link>
      </div>
    </header>
  );
}

export default Header;
