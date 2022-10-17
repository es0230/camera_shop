import { Link } from 'react-router-dom';
import { AppRoute } from '../../../../const';

type CatalogPaginationProps = {
  currentPage: number,
  totalPageAmount: number,
}
function CatalogPagination({ currentPage, totalPageAmount }: CatalogPaginationProps): JSX.Element {
  return (
    <div data-testid="catalog-pagination-component" className="pagination">
      <ul className="pagination__list">
        {currentPage !== 1 ?
          <li className="pagination__item">
            <Link className="pagination__link pagination__link--text" to={AppRoute.Catalog(currentPage - 1)}>Назад</Link>
          </li> :
          <> </>}
        {Array.from({ length: totalPageAmount }, (el, i) => (
          <li className="pagination__item" key={i}>
            <Link className={`pagination__link ${currentPage === i + 1 ? 'pagination__link--active' : ''}`} to={AppRoute.Catalog(i + 1)}>{i + 1}</Link>
          </li>
        ))}
        {currentPage !== totalPageAmount ?
          <li className="pagination__item">
            <Link className="pagination__link pagination__link--text" to={AppRoute.Catalog(currentPage + 1)}>Далее</Link>
          </li> :
          <> </>}
      </ul>
    </div>
  );
}

export default CatalogPagination;
