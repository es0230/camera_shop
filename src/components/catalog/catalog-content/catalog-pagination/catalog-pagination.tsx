import { Link } from 'react-router-dom';
import { AppRoute, PRODUCTS_PER_PAGE } from '../../../../const';
import { useAppSelector } from '../../../../hooks';
import { selectTotalCount } from '../../../../store/app-data/selectors';
import { URLParams } from '../../../../types/url-params';

type CatalogPaginationProps = {
  params: URLParams,
}

function CatalogPagination({ params }: CatalogPaginationProps): JSX.Element {
  const { page } = params;

  const totalPageAmount = Math.ceil(+useAppSelector(selectTotalCount) / PRODUCTS_PER_PAGE);

  return (
    <div data-testid="catalog-pagination-component" className="pagination">
      <ul className="pagination__list">
        {+page !== 1 ?
          <li className="pagination__item">
            <Link className="pagination__link pagination__link--text" to={AppRoute.Catalog({ ...params, page: `${+page - 1}` })}>
              Назад
            </Link>
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
