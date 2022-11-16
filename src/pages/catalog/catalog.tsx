import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Ad from '../../components/ad/ad';
import CatalogGallery from '../../components/catalog/catalog-content/catalog-gallery/catalog-gallery';
import CatalogPagination from '../../components/catalog/catalog-content/catalog-pagination/catalog-pagination';
import CatalogSort from '../../components/catalog/catalog-content/catalog-sort/catalog-sort';
import CatalogFilter from '../../components/catalog/catalog-filter/catalog-filter';
import LoadingScreen from '../../components/loading-screen/loading-screen';
import ServerError from '../../components/server-error/server-error';
import { AppRoute, DEFAULT_FILTER_VALUE, INITIAL_CATALOG_PAGE_URL_PARAMS, SortOrder, SortType } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { usePageParams } from '../../hooks/use-page-params';
//import { fetchCamerasAction } from '../../store/api-actions';
import { selectCameras, selectIsDataLoaded, selectIsLoadingFailed, selectMaxPrice, selectMinPrice, selectPromo } from '../../store/app-data/selectors';
import { actualizeState, setSortOrder, setSortType } from '../../store/catalog-parameters/catalog-parameters';
import { URLParams } from '../../types/url-params';

function Catalog(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const pageParams = usePageParams() as URLParams;
  const page = pageParams.page;
  const minPrice = useAppSelector(selectMinPrice);
  const maxPrice = useAppSelector(selectMaxPrice);

  const ad = useAppSelector(selectPromo);
  const cameras = useAppSelector(selectCameras);
  const isDataLoaded = useAppSelector(selectIsDataLoaded);
  const isLoadingFailed = useAppSelector(selectIsLoadingFailed);

  const [stateNeedsUpdate, setStateNeedsUpdate] = useState(true);

  useEffect(() => {
    if (stateNeedsUpdate) {
      dispatch(actualizeState(pageParams));
      setStateNeedsUpdate(false);
    }
  }, [dispatch, pageParams, stateNeedsUpdate]);

  useEffect(() => {
    if (pageParams.minPrice === DEFAULT_FILTER_VALUE || pageParams.minPrice === '0' || pageParams.maxPrice === DEFAULT_FILTER_VALUE || pageParams.maxPrice === '0') {
      navigate(AppRoute.Catalog({ ...INITIAL_CATALOG_PAGE_URL_PARAMS, minPrice, maxPrice }));
    }
  }, [maxPrice, minPrice, navigate, pageParams.maxPrice, pageParams.minPrice]);

  if (isLoadingFailed ||
    pageParams === undefined ||
    (pageParams.sortType !== SortType.Price && pageParams.sortType !== SortType.Rating) ||
    (pageParams.order !== SortOrder.Ascending && pageParams.order !== SortOrder.Descending)) {
    return <ServerError />;
  }

  const onSortTypeButtonClick = (evt: React.ChangeEvent) => {
    const newSortType = evt.currentTarget.id;
    dispatch(setSortType(newSortType));
    navigate(AppRoute.Catalog({ ...pageParams, sortType: newSortType }));
  };

  const onSortOrderButtonClick = (evt: React.ChangeEvent) => {
    const newSortOrder = evt.currentTarget.id;
    dispatch(setSortOrder(newSortOrder));
    navigate(AppRoute.Catalog({ ...pageParams, order: newSortOrder }));
  };

  const onClearFiltersButtonClick = () => {
    setStateNeedsUpdate(true);
  };

  if (page) {

    return (
      <>
        <Ad ad={ad} />
        <div data-testid="catalog-page" className="page-content">
          <div data-testid="breadcrumbs" className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link className="breadcrumbs__link" to={AppRoute.Catalog({ ...INITIAL_CATALOG_PAGE_URL_PARAMS, minPrice, maxPrice })}>Главная
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </Link>
                </li>
                <li className="breadcrumbs__item">
                  <span className="breadcrumbs__link breadcrumbs__link--active">Каталог</span>
                </li>
              </ul>
            </div>
          </div>
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <CatalogFilter minPrice={minPrice} maxPrice={maxPrice} onClearFiltersButtonClick={onClearFiltersButtonClick} />
                <div className="catalog__content">
                  <CatalogSort onSortTypeButtonClick={onSortTypeButtonClick} onSortOrderButtonClick={onSortOrderButtonClick} />
                  {isDataLoaded ?
                    (<LoadingScreen />) :
                    (
                      <>
                        <CatalogGallery cameras={cameras} />
                        <CatalogPagination params={pageParams} />
                      </>
                    )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </>
    );
  }

  navigate(AppRoute.Unknown());
  return (<> </>);
}

export default Catalog;
