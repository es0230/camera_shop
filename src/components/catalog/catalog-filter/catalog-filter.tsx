import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute, INITIAL_CATALOG_PAGE_URL_PARAMS } from '../../../const';
import { useAppDispatch, useAppSelector, } from '../../../hooks';
import { selectPrices } from '../../../store/app-data/selectors';
import { setMaxPriceFilter, setMinPriceFilter, toggleCameraTypeFilter, toggleCategoryFilter, toggleLevelFilter } from '../../../store/catalog-parameters/catalog-parameters';
import { selectFilterState, selectPageParams } from '../../../store/catalog-parameters/selectors';

type CatalogFilterProps = {
  minPrice: string,
  maxPrice: string,
  onClearFiltersButtonClick: () => void,
}

enum PriceFilterNames {
  MinPrice = 'minPrice',
  MaxPrice = 'maxPrice'
}

function CatalogFilter({ minPrice, maxPrice, onClearFiltersButtonClick }: CatalogFilterProps): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const filterState = useAppSelector(selectFilterState);
  const pageParams = useAppSelector(selectPageParams);
  const [filtersUpdated, setFiltersUpdated] = useState(false);

  const productPrices = useAppSelector(selectPrices);

  useEffect(() => {
    if (filtersUpdated) {
      navigate(AppRoute.Catalog({ ...pageParams, page: '1' }));
      setFiltersUpdated(false);
    }
  }, [dispatch, filtersUpdated, navigate, pageParams]);

  const handleFilterPriceChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const target = evt.currentTarget;
    if (
      target.value === '' ||
      +target.value < 0 ||
      (target.name === PriceFilterNames.MinPrice && +target.value < +minPrice) ||
      (target.name === PriceFilterNames.MaxPrice && +target.value > +maxPrice)
    ) {
      target.value = target.name === PriceFilterNames.MinPrice ? minPrice : maxPrice;
    } else {
      if (target.name === PriceFilterNames.MaxPrice && +target.value < +filterState.price.minPrice) {
        target.value = filterState.price.minPrice;
      }
      if (target.name === PriceFilterNames.MinPrice && +target.value > +filterState.price.maxPrice) {
        target.value = filterState.price.maxPrice;
      }
      if (!productPrices.includes(target.value)) {
        const priceDifferences = productPrices.slice().map((el) => Math.abs(+el - +target.value));
        const indexOfMinimalDifference = priceDifferences.indexOf(Math.min(...priceDifferences));
        const closestPrice = String(productPrices[indexOfMinimalDifference]);
        target.value = closestPrice;
      }
    }
    if (target.name === PriceFilterNames.MinPrice) {
      dispatch(setMinPriceFilter(target.value));
    } else {
      dispatch(setMaxPriceFilter(target.value));
    }
    setFiltersUpdated(true);
  };

  const handleFilterCategoryClick = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const target = evt.currentTarget;
    dispatch(toggleCategoryFilter(target.name));
    setFiltersUpdated(true);
  };

  const handleFilterProductTypeClick = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const target = evt.currentTarget;
    dispatch(toggleCameraTypeFilter(target.name));
    setFiltersUpdated(true);
  };

  const handleFilterLevelClick = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const target = evt.currentTarget;
    dispatch(toggleLevelFilter(target.name));
    setFiltersUpdated(true);
  };

  const handleClearFiltersButtonClick = () => {
    navigate(AppRoute.Catalog({ ...INITIAL_CATALOG_PAGE_URL_PARAMS, minPrice: productPrices[0], maxPrice: productPrices[productPrices.length - 1] }));
    onClearFiltersButtonClick();
    setFiltersUpdated(true);
  };

  return (
    <div data-testid="catalog-filter-component" className="catalog__aside">
      <div className="catalog-filter">
        <form action="#">
          <h2 className="visually-hidden">????????????</h2>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">????????, ???</legend>
            <div className="catalog-filter__price-range">
              <div className="custom-input">
                <label>
                  <input type="number" data-testid="minPriceInput" name="minPrice" min={0} placeholder={minPrice} onBlur={handleFilterPriceChange} />
                </label>
              </div>
              <div className="custom-input">
                <label>
                  <input type="number" data-testid="maxPriceInput" name="maxPrice" min={0} placeholder={maxPrice} onBlur={handleFilterPriceChange} />
                </label>
              </div>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">??????????????????</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" data-testid="photoCategory" name="??????????????????????" checked={filterState.category['??????????????????????']} onChange={handleFilterCategoryClick} />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">????????????????????</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" data-testid="videoCategory" name="??????????????????????" checked={filterState.category['??????????????????????']} disabled={filterState.type['??????????????????'] || filterState.type['????????????????????????']} onChange={handleFilterCategoryClick} />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">??????????????????????</span>
              </label>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">?????? ????????????</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" data-testid="digitalType" name="????????????????" checked={filterState.type['????????????????']} onChange={handleFilterProductTypeClick} />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">????????????????</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" data-testid="filmType" name="??????????????????" checked={filterState.type['??????????????????']} disabled={filterState.category['??????????????????????']} onChange={handleFilterProductTypeClick} />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">??????????????????</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" data-testid="snapshotType" name="????????????????????????" checked={filterState.type['????????????????????????']} disabled={filterState.category['??????????????????????']} onChange={handleFilterProductTypeClick} />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">????????????????????????</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" data-testid="collectionType" name="??????????????????????????" checked={filterState.type['??????????????????????????']} onChange={handleFilterProductTypeClick} />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">??????????????????????????</span>
              </label>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">??????????????</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" data-testid="zeroLevel" name="??????????????" checked={filterState.level['??????????????']} onChange={handleFilterLevelClick} />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">??????????????</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" data-testid="amateurLevel" name="????????????????????????" checked={filterState.level['????????????????????????']} onChange={handleFilterLevelClick} />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">????????????????????????</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" data-testid="professionalLevel" name="????????????????????????????????" checked={filterState.level['????????????????????????????????']} onChange={handleFilterLevelClick} />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">????????????????????????????????</span>
              </label>
            </div>
          </fieldset>
          <button className="btn catalog-filter__reset-btn" data-testid="resetButton" type="reset" onClick={handleClearFiltersButtonClick}>???????????????? ??????????????</button>
        </form>
      </div>
    </div>
  );
}

export default CatalogFilter;
