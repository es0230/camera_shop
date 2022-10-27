import { SortOrder, SortType } from '../../../../const';
import { URLParams } from '../../../../types/url-params';

type CatalogSortProps = {
  handleSortTypeButtonClick: React.ChangeEventHandler<HTMLInputElement>,
  handleSortOrderButtonClick: React.ChangeEventHandler<HTMLInputElement>,
  params: URLParams
}

function CatalogSort({ handleSortTypeButtonClick, handleSortOrderButtonClick, params }: CatalogSortProps): JSX.Element {
  const { sortType, order } = params;

  return (
    <div data-testid="catalog-sort-component" className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input type="radio" id="price" name="sort" checked={sortType === SortType.Price} onChange={handleSortTypeButtonClick} />
              <label htmlFor="price">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input type="radio" id="rating" name="sort" checked={sortType === SortType.Rating} onChange={handleSortTypeButtonClick} />
              <label htmlFor="rating">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input type="radio" id="asc" name="sort-icon" checked={order === SortOrder.Ascending} aria-label="По возрастанию" onChange={handleSortOrderButtonClick} />
              <label htmlFor="asc">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input type="radio" id="desc" name="sort-icon" checked={order === SortOrder.Descending} aria-label="По убыванию" onChange={handleSortOrderButtonClick} />
              <label htmlFor="desc">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CatalogSort;
