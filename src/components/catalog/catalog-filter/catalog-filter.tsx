/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute, FilterCategories, FilterTypes } from '../../../const';
import { Filter } from '../../../types/filter';
import { URLParams } from '../../../types/url-params';

type CatalogFilterProps = {
  params: URLParams,
}

const initialFilterState: Filter = {
  category: {
    photocamera: false,
    videocamera: false,
  },
  type: {
    digital: false,
    film: false,
    snapshot: false,
    collection: false,
  }
};

function CatalogFilter({ params }: CatalogFilterProps): JSX.Element {
  const navigate = useNavigate();
  const [filterState, setFilterState] = useState(initialFilterState);
  const [filtersUpdated, setFiltersUpdated] = useState(false);

  useEffect(() => {
    if (filtersUpdated) {
      const newFilterCategory = Object.entries(filterState.category).filter(([, toggled]) => toggled).map((el) => el[0]).join(',') || FilterCategories.Any;
      const newFilterType = Object.entries(filterState.type).filter(([, toggled]) => toggled).map((el) => el[0]).join(',') || FilterTypes.Any;
      navigate(AppRoute.Catalog({ ...params, category: newFilterCategory, producttype: newFilterType }));
      setFiltersUpdated(false);
    }
  }, [filterState.category, filterState.type, filtersUpdated, navigate, params]);

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

  const handleClearFiltersButtonClick = () => {
    navigate(AppRoute.Catalog(params));
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
                  <input type="number" name="price" placeholder="от" />
                </label>
              </div>
              <div className="custom-input">
                <label>
                  <input type="number" name="priceUp" placeholder="до" />
                </label>
              </div>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Категория</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="photocamera" checked={params.category.includes(FilterCategories.Photo)} onChange={handleFilterCategoryClick} />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">Фотокамера</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="videocamera" checked={params.category.includes(FilterCategories.Video)} disabled={params.producttype.includes(FilterTypes.Film) || params.producttype.includes(FilterTypes.Snapshot)} onChange={handleFilterCategoryClick} />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">Видеокамера</span>
              </label>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Тип камеры</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="digital" checked={params.producttype.includes(FilterTypes.Digital)} onChange={handleFilterProductTypeClick} />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">Цифровая</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="film" checked={params.producttype.includes(FilterTypes.Film)} disabled={params.category.includes(FilterCategories.Video)} onChange={handleFilterProductTypeClick} />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">Плёночная</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="snapshot" checked={params.producttype.includes(FilterTypes.Snapshot)} disabled={params.category.includes(FilterCategories.Video)} onChange={handleFilterProductTypeClick} />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">Моментальная</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="collection" checked={params.producttype.includes(FilterTypes.Collection)} onChange={handleFilterProductTypeClick} />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">Коллекционная</span>
              </label>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Уровень</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="zero" />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">Нулевой</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="non-professional" />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">Любительский</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="professional" />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">Профессиональный</span>
              </label>
            </div>
          </fieldset>
          <button className="btn catalog-filter__reset-btn" type="reset" onClick={handleClearFiltersButtonClick}>Сбросить фильтры</button>
        </form>
      </div>
    </div>
  );
}

export default CatalogFilter;
