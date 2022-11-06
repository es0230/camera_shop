import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute, FilterCategories, FilterTypes, FilterLevels, DEFAULT_FILTER_VALUE } from '../../../const';
import { Camera } from '../../../types/camera';
import { Filter } from '../../../types/filter';
import { URLParams } from '../../../types/url-params';

type CatalogFilterProps = {
  params: URLParams,
  cameras: Camera[],
}

const initialFilterState: Filter = {
  price: {
    minPrice: DEFAULT_FILTER_VALUE,
    maxPrice: DEFAULT_FILTER_VALUE,
  },
  category: {
    photocamera: false,
    videocamera: false,
  },
  type: {
    digital: false,
    film: false,
    snapshot: false,
    collection: false,
  },
  level: {
    zero: false,
    amateur: false,
    professional: false,
  }
};

enum PriceFilterNames {
  MinPrice = 'minPrice',
  MaxPrice = 'maxPrice'
}

function CatalogFilter({ params, cameras }: CatalogFilterProps): JSX.Element {
  const navigate = useNavigate();
  const [filterState, setFilterState] = useState(initialFilterState);
  const [filtersUpdated, setFiltersUpdated] = useState(false);

  const productPrices = useMemo(() => {
    if (cameras.length !== 0) {
      const sortedCameraPrices = cameras.slice().sort((a, b) => a.price - b.price).map((el) => el.price);
      return sortedCameraPrices;
    }
    return [0];
  }, [cameras]);

  const currentMinPrice = String(Math.min(...productPrices));
  const currentMaxPrice = String(Math.max(...productPrices));

  useEffect(() => {
    if (cameras.length !== 0 && (filterState.price.minPrice === DEFAULT_FILTER_VALUE || filterState.price.maxPrice === DEFAULT_FILTER_VALUE)) {
      setFilterState({ ...filterState, price: { minPrice: currentMinPrice, maxPrice: currentMaxPrice } });
      setFiltersUpdated(true);
    }
    if (filtersUpdated) {
      const newFilterMinPrice = filterState.price.minPrice;
      const newFilterMaxPrice = filterState.price.maxPrice;
      const newFilterCategory = Object.entries(filterState.category).filter(([, toggled]) => toggled).map((el) => el[0]).join(',') || FilterCategories.Any;
      const newFilterType = Object.entries(filterState.type).filter(([, toggled]) => toggled).map((el) => el[0]).join(',') || FilterTypes.Any;
      const newFilterLevel = Object.entries(filterState.level).filter(([, toggled]) => toggled).map((el) => el[0]).join(',') || FilterLevels.Any;
      navigate(AppRoute.Catalog({ ...params, minPrice: newFilterMinPrice, maxPrice: newFilterMaxPrice, category: newFilterCategory, productType: newFilterType, level: newFilterLevel }));
      setFiltersUpdated(false);
    }
  }, [cameras.length, currentMaxPrice, currentMinPrice, filterState, filtersUpdated, navigate, params]);

  const handleFilterPriceChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const target = evt.currentTarget;
    if (
      target.value === '' ||
      +target.value < 0 ||
      (target.name === PriceFilterNames.MinPrice && +target.value < +currentMinPrice) ||
      (target.name === PriceFilterNames.MaxPrice && +target.value > +currentMaxPrice)
    ) {
      target.value = target.name === PriceFilterNames.MinPrice ? currentMinPrice : currentMaxPrice;
      setFilterState({ ...filterState, price: { ...filterState.price, [target.name]: target.name === PriceFilterNames.MinPrice ? currentMinPrice : currentMaxPrice } });
    } else {
      if (target.name === PriceFilterNames.MaxPrice && +target.value < +filterState.price.minPrice) {
        target.value = filterState.price.minPrice;
      }
      if (target.name === PriceFilterNames.MinPrice && +target.value > +filterState.price.maxPrice) {
        target.value = filterState.price.maxPrice;
      }
      if (!productPrices.includes(+target.value)) {
        const priceDifferences = productPrices.slice().map((el) => Math.abs(el - +target.value));
        const indexOfMinimalDifference = priceDifferences.indexOf(Math.min(...priceDifferences));
        const closestPrice = String(productPrices[indexOfMinimalDifference]);
        target.value = closestPrice;
      }
      setFilterState({ ...filterState, price: { ...filterState.price, [target.name]: target.value } });
    }
    setFiltersUpdated(true);
  };

  const handleFilterCategoryClick = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const target = evt.currentTarget;
    setFilterState({ ...filterState, category: { ...filterState.category, [target.name]: target.checked } });
    setFiltersUpdated(true);
  };

  const handleFilterProductTypeClick = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const target = evt.currentTarget;
    setFilterState({ ...filterState, type: { ...filterState.type, [target.name]: target.checked } });
    setFiltersUpdated(true);
  };

  const handleFilterLevelClick = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const target = evt.currentTarget;
    setFilterState({ ...filterState, level: { ...filterState.level, [target.name]: target.checked } });
    setFiltersUpdated(true);
  };

  const handleClearFiltersButtonClick = () => {
    setFilterState({ ...initialFilterState, price: { minPrice: currentMinPrice, maxPrice: currentMaxPrice } });
    setFiltersUpdated(true);
  };

  return (
    <div data-testid="catalog-filter-component" className="catalog__aside">
      <div className="catalog-filter">
        <form action="#">
          <h2 className="visually-hidden">Фильтр</h2>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Цена, ₽</legend>
            <div className="catalog-filter__price-range">
              <div className="custom-input">
                <label>
                  <input type="number" data-testid="minPriceInput" name="minPrice" min={0} placeholder={filterState.price.minPrice} onBlur={handleFilterPriceChange} />
                </label>
              </div>
              <div className="custom-input">
                <label>
                  <input type="number" data-testid="maxPriceInput" name="maxPrice" min={0} placeholder={filterState.price.maxPrice} onBlur={handleFilterPriceChange} />
                </label>
              </div>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Категория</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" data-testid="photoCategory" name="photocamera" checked={params.category.includes(FilterCategories.Photo)} onChange={handleFilterCategoryClick} />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">Фотокамера</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" data-testid="videoCategory" name="videocamera" checked={params.category.includes(FilterCategories.Video)} disabled={params.productType.includes(FilterTypes.Film) || params.productType.includes(FilterTypes.Snapshot)} onChange={handleFilterCategoryClick} />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">Видеокамера</span>
              </label>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Тип камеры</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" data-testid="digitalType" name="digital" checked={params.productType.includes(FilterTypes.Digital)} onChange={handleFilterProductTypeClick} />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">Цифровая</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" data-testid="filmType" name="film" checked={params.productType.includes(FilterTypes.Film)} disabled={params.category.includes(FilterCategories.Video)} onChange={handleFilterProductTypeClick} />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">Плёночная</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" data-testid="snapshotType" name="snapshot" checked={params.productType.includes(FilterTypes.Snapshot)} disabled={params.category.includes(FilterCategories.Video)} onChange={handleFilterProductTypeClick} />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">Моментальная</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" data-testid="collectionType" name="collection" checked={params.productType.includes(FilterTypes.Collection)} onChange={handleFilterProductTypeClick} />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">Коллекционная</span>
              </label>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Уровень</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" data-testid="zeroLevel" name="zero" checked={params.level.includes(FilterLevels.Zero)} onChange={handleFilterLevelClick} />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">Нулевой</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" data-testid="amateurLevel" name="amateur" checked={params.level.includes(FilterLevels.Amateur)} onChange={handleFilterLevelClick} />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">Любительский</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" data-testid="professionalLevel" name="professional" checked={params.level.includes(FilterLevels.Professional)} onChange={handleFilterLevelClick} />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">Профессиональный</span>
              </label>
            </div>
          </fieldset>
          <button className="btn catalog-filter__reset-btn" data-testid="resetButton" type="reset" onClick={handleClearFiltersButtonClick}>Сбросить фильтры</button>
        </form>
      </div>
    </div>
  );
}

export default CatalogFilter;
