import { SortOrder, SortType } from '../../../../const';
import { useAppSelector } from '../../../../hooks';
import { selectSortState } from '../../../../store/catalog-parameters/selectors';

type CatalogSortProps = {
  onSortTypeButtonClick: React.ChangeEventHandler<HTMLInputElement>,
  onSortOrderButtonClick: React.ChangeEventHandler<HTMLInputElement>
}

function CatalogSort({ onSortTypeButtonClick, onSortOrderButtonClick }: CatalogSortProps): JSX.Element {
  const sortState = useAppSelector(selectSortState);

  return (
    <div data-testid="catalog-sort-component" className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input data-testid="priceSort" type="radio" id="price" name="sort" checked={sortState.type === SortType.Price} onChange={onSortTypeButtonClick} />
              <label htmlFor="price">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input data-testid="popularitySort" type="radio" id="rating" name="sort" checked={sortState.type === SortType.Rating} onChange={onSortTypeButtonClick} />
              <label htmlFor="rating">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input data-testid="ascSort" type="radio" id="asc" name="sort-icon" checked={sortState.order === SortOrder.Ascending} aria-label="По возрастанию" onChange={onSortOrderButtonClick} />
              <label htmlFor="asc">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input data-testid="descSort" type="radio" id="desc" name="sort-icon" checked={sortState.order === SortOrder.Descending} aria-label="По убыванию" onChange={onSortOrderButtonClick} />
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
