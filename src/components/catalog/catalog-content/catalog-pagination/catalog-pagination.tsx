import { Link } from 'react-router-dom';
import { AppRoute } from '../../../../const';
import { URLParams } from '../../../../types/url-params';

type CatalogPaginationProps = {
  params: URLParams,
  totalPageAmount: number,
}

function CatalogPagination({ params, totalPageAmount }: CatalogPaginationProps): JSX.Element {
  const { page } = params;

  return (
    <div data-testid="catalog-pagination-component" className="pagination">
      <ul className="pagination__list">
        {+page !== 1 ?
          <li className="pagination__item">
            <Link className="pagination__link pagination__link--text" to={AppRoute.Catalog({ ...params, page: `${+page - 1}` })}>Назад</Link>
          </li> :
          <> </>}
        {Array.from({ length: totalPageAmount }, (el, i) => (
          <li className="pagination__item" key={i}>
            <Link className={`pagination__link ${+page === i + 1 ? 'pagination__link--active' : ''}`} to={AppRoute.Catalog({ ...params, page: `${i + 1}` })}>{i + 1}</Link>
          </li>
        ))}
        {+page !== totalPageAmount ?
          <li className="pagination__item">
            <Link className="pagination__link pagination__link--text" to={AppRoute.Catalog({ ...params, page: `${+page + 1}` })}>Далее</Link>
          </li> :
          <> </>}
      </ul>
    </div>
  );
}

export default CatalogPagination;
