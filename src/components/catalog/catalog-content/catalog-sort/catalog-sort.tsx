import { SortOrder, SortType } from '../../../../const';

type CatalogSortProps = {
  handleSortTypeButtonClick: React.MouseEventHandler<HTMLInputElement>,
  handleSortOrderButtonClick: React.MouseEventHandler<HTMLInputElement>,
  type: string,
  order: string,
}

function CatalogSort({ handleSortTypeButtonClick, handleSortOrderButtonClick, type, order }: CatalogSortProps): JSX.Element {
  return (
    <div data-testid="catalog-sort-component" className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input type="radio" id="price" name="sort" checked={type === SortType.Price} onClick={handleSortTypeButtonClick} />
              <label htmlFor="price">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input type="radio" id="rating" name="sort" checked={type === SortType.Rating} onClick={handleSortTypeButtonClick} />
              <label htmlFor="rating">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input type="radio" id="asc" name="sort-icon" checked={order === SortOrder.Ascending} aria-label="По возрастанию" onClick={handleSortOrderButtonClick} />
              <label htmlFor="asc">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input type="radio" id="desc" name="sort-icon" checked={order === SortOrder.Descending} aria-label="По убыванию" onClick={handleSortOrderButtonClick} />
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
