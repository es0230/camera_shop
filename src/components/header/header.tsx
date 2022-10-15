import { Link } from 'react-router-dom';
import { AppRoute, INITIAL_PAGE } from '../../const';
import BasketIcon from '../svg/basket-icon/basket-icon';
import CloseIcon from '../svg/close-icon/close-icon';
import LensIcon from '../svg/lens-icon/lens-icon';
import LogoIcon from '../svg/logo-icon/logo-icon';

function Header(): JSX.Element {
  return (
    <header data-testid="header-component" className="header" id="header">
      <div className="container">
        <Link className="header__logo" to={AppRoute.Catalog(INITIAL_PAGE)} aria-label="Переход на главную">
          <LogoIcon />
        </Link>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link className="main-nav__link" to={AppRoute.Catalog(INITIAL_PAGE)}>Каталог</Link>
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
        <div className="form-search">
          <form>
            <label>
              <LensIcon />
              <input className="form-search__input" type="text" autoComplete="off" placeholder="Поиск по сайту" />
            </label>
            <ul className="form-search__select-list">
              <li className="form-search__select-item" tabIndex={0}>Cannonball Pro MX 8i</li>
              <li className="form-search__select-item" tabIndex={0}>Cannonball Pro MX 7i</li>
              <li className="form-search__select-item" tabIndex={0}>Cannonball Pro MX 6i</li>
              <li className="form-search__select-item" tabIndex={0}>Cannonball Pro MX 5i</li>
              <li className="form-search__select-item" tabIndex={0}>Cannonball Pro MX 4i</li>
            </ul>
          </form>
          <button className="form-search__reset" type="reset">
            <CloseIcon />
            <span className="visually-hidden">Сбросить поиск</span>
          </button>
        </div>
        <Link className="header__basket-link" to={AppRoute.Unknown()}>
          <BasketIcon />
        </Link>
      </div>
    </header>
  );
}

export default Header;
