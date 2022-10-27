import { Link } from 'react-router-dom';
import { AppRoute, INITIAL_CATALOG_PAGE_URL_PARAMS } from '../../const';

function Footer(): JSX.Element {
  return (
    <footer data-testid="footer-component" className="footer">
      <div className="container">
        <div className="footer__info">
          <Link className="footer__logo" to={AppRoute.Catalog(INITIAL_CATALOG_PAGE_URL_PARAMS)} aria-label="Переход на главную">
            <svg width="100" height="36" aria-hidden="true">
              <use xlinkHref="#icon-logo-mono" />
            </svg>
          </Link>
          <p className="footer__description">Интернет-магазин фото- и видеотехники</p>
          <ul className="social">
            <li className="social__item">
              <Link className="link" to={AppRoute.Unknown()} aria-label="Переход на страницу вконтатке">
                <svg width="20" height="20" aria-hidden="true">
                  <use xlinkHref="#icon-vk" />
                </svg>
              </Link>
            </li>
            <li className="social__item">
              <Link className="link" to={AppRoute.Unknown()} aria-label="Переход на страницу pinterest">
                <svg width="20" height="20" aria-hidden="true">
                  <use xlinkHref="#icon-pinterest" />
                </svg>
              </Link>
            </li>
            <li className="social__item">
              <Link className="link" to={AppRoute.Unknown()} aria-label="Переход на страницу reddit">
                <svg width="20" height="20" aria-hidden="true">
                  <use xlinkHref="#icon-reddit" />
                </svg>
              </Link>
            </li>
          </ul>
        </div>
        <ul className="footer__nav">
          <li className="footer__nav-item">
            <p className="footer__title">Навигация</p>
            <ul className="footer__list">
              <li className="footer__item">
                <Link className="link" to={AppRoute.Catalog(INITIAL_CATALOG_PAGE_URL_PARAMS)}>Каталог</Link>
              </li>
              <li className="footer__item">
                <Link className="link" to={AppRoute.Unknown()}>Гарантии</Link>
              </li>
              <li className="footer__item">
                <Link className="link" to={AppRoute.Unknown()}>Доставка</Link>
              </li>
              <li className="footer__item">
                <Link className="link" to={AppRoute.Unknown()}>О компании</Link>
              </li>
            </ul>
          </li>
          <li className="footer__nav-item">
            <p className="footer__title">Ресурсы</p>
            <ul className="footer__list">
              <li className="footer__item">
                <Link className="link" to={AppRoute.Unknown()}>Курсы операторов</Link>
              </li>
              <li className="footer__item">
                <Link className="link" to={AppRoute.Unknown()}>Блог</Link>
              </li>
              <li className="footer__item">
                <Link className="link" to={AppRoute.Unknown()}>Сообщество</Link>
              </li>
            </ul>
          </li>
          <li className="footer__nav-item">
            <p className="footer__title">Поддержка</p>
            <ul className="footer__list">
              <li className="footer__item">
                <Link className="link" to={AppRoute.Unknown()}>FAQ</Link>
              </li>
              <li className="footer__item">
                <Link className="link" to={AppRoute.Unknown()}>Задать вопрос</Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
