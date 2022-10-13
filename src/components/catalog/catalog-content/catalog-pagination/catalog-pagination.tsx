import { Link } from 'react-router-dom';
import { AppRoute } from '../../../../const';

type CatalogPaginationProps = {
  currentPage: number,
  totalPageAmount: number,
}
function CatalogPagination({ currentPage, totalPageAmount }: CatalogPaginationProps): JSX.Element {
  switch (currentPage) {
    case 1:
      return (
        <div data-testid="catalog-pagination-component" className="pagination">
          <ul className="pagination__list">
            <li className="pagination__item">
              <Link className="pagination__link pagination__link--active" to={AppRoute.Catalog(currentPage)}>1</Link>
            </li>
            <li className="pagination__item">
              <Link className="pagination__link" to={AppRoute.Catalog(currentPage + 1)}>2</Link>
            </li>
            <li className="pagination__item">
              <Link className="pagination__link" to={AppRoute.Catalog(currentPage + 2)}>3</Link>
            </li>
            <li className="pagination__item">
              <Link className="pagination__link pagination__link--text" to={AppRoute.Catalog(currentPage + 1)}>Далее</Link>
            </li>
          </ul>
        </div>
      );
    case totalPageAmount:
      return (
        <div data-testid="catalog-pagination-component" className="pagination">
          <ul className="pagination__list">
            <li className="pagination__item">
              <Link className="pagination__link pagination__link--text" to={AppRoute.Catalog(currentPage - 1)}>Назад</Link>
            </li>
            <li className="pagination__item">
              <Link className="pagination__link" to={AppRoute.Catalog(currentPage - 2)}>{currentPage - 2}</Link>
            </li>
            <li className="pagination__item">
              <Link className="pagination__link" to={AppRoute.Catalog(currentPage - 1)}>{currentPage - 1}</Link>
            </li>
            <li className="pagination__item">
              <Link className="pagination__link pagination__link--active" to={AppRoute.Catalog(currentPage)}>{totalPageAmount}</Link>
            </li>
          </ul>
        </div>
      );
    default:
      return (
        <div data-testid="catalog-pagination-component" className="pagination">
          <ul className="pagination__list">
            <li className="pagination__item">
              <Link className="pagination__link pagination__link--text" to={AppRoute.Catalog(currentPage - 1)}>Назад</Link>
            </li>
            <li className="pagination__item">
              <Link className="pagination__link" to={AppRoute.Catalog(currentPage - 1)}>{currentPage - 1}</Link>
            </li>
            <li className="pagination__item">
              <Link className="pagination__link pagination__link--active" to={AppRoute.Catalog(currentPage)}>{currentPage}</Link>
            </li>
            <li className="pagination__item">
              <Link className="pagination__link" to={AppRoute.Catalog(currentPage + 1)}>{currentPage + 1}</Link>
            </li>
            <li className="pagination__item">
              <Link className="pagination__link pagination__link--text" to={AppRoute.Catalog(currentPage + 1)}>Далее</Link>
            </li>
          </ul>
        </div>
      );
  }
}

export default CatalogPagination;
