import { Link } from 'react-router-dom';
import { AppRoute } from '../../../../const';

type CatalogPaginationProps = {
  page: number,
  type: string,
  order: string,
  totalPageAmount: number,
}

function CatalogPagination({ page, type, order, totalPageAmount }: CatalogPaginationProps): JSX.Element {
  return (
    <div data-testid="catalog-pagination-component" className="pagination">
      <ul className="pagination__list">
        {page !== 1 ?
          <li className="pagination__item">
            <Link className="pagination__link pagination__link--text" to={AppRoute.Catalog(page - 1, type, order)}>Назад</Link>
          </li> :
          <> </>}
        {Array.from({ length: totalPageAmount }, (el, i) => (
          <li className="pagination__item" key={i}>
            <Link className={`pagination__link ${page === i + 1 ? 'pagination__link--active' : ''}`} to={AppRoute.Catalog(i + 1, type, order)}>{i + 1}</Link>
          </li>
        ))}
        {page !== totalPageAmount ?
          <li className="pagination__item">
            <Link className="pagination__link pagination__link--text" to={AppRoute.Catalog(page + 1, type, order)}>Далее</Link>
          </li> :
          <> </>}
      </ul>
    </div>
  );
}

export default CatalogPagination;
