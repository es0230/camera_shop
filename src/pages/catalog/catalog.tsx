import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Ad from '../../components/ad/ad';
import CatalogGallery from '../../components/catalog/catalog-content/catalog-gallery/catalog-gallery';
import CatalogPagination from '../../components/catalog/catalog-content/catalog-pagination/catalog-pagination';
import CatalogSort from '../../components/catalog/catalog-content/catalog-sort/catalog-sort';
import CatalogFilter from '../../components/catalog/catalog-filter/catalog-filter';
import { AppRoute, FilterCategories, FilterTypes, INITIAL_CATALOG_PAGE_URL_PARAMS, SortOrder, SortType } from '../../const';
import { useAppSelector } from '../../hooks';
import { usePageParams } from '../../hooks/use-page-params';
import { selectCameras, selectPromo } from '../../store/app-data/selectors';
import { Camera } from '../../types/camera';
import { URLParams } from '../../types/url-params';

const CARDSONPAGE = 9;

const filterCameras = (cameras: Camera[], params: URLParams) => {
  const { category, producttype } = params;
  const filteredByCategory = filterByCategory(cameras, category);
  const filteredByProductType = filterByProductType(filteredByCategory, producttype);

  return filteredByProductType;
};

const filterByCategory = (cameras: Camera[], category: string) => {
  if (category === FilterCategories.Any) {
    return cameras;
  }
  const filteredCameras = [
    ...(category.includes(FilterCategories.Photo) ? cameras.filter((el) => el.category === 'Фотоаппарат') : []),
    ...(category.includes(FilterCategories.Video) ? cameras.filter((el) => el.category === 'Видеокамера') : [])
  ];
  return filteredCameras;
};

const filterByProductType = (cameras: Camera[], productType: string) => {
  if (productType === FilterTypes.Any) {
    return cameras;
  }
  const filteredCameras = [
    ...(productType.includes(FilterTypes.Collection) ? cameras.filter((el) => el.type === 'Коллекционная') : []),
    ...(productType.includes(FilterTypes.Digital) ? cameras.filter((el) => el.type === 'Цифровая') : []),
    ...(productType.includes(FilterTypes.Film) ? cameras.filter((el) => el.type === 'Плёночная') : []),
    ...(productType.includes(FilterTypes.Snapshot) ? cameras.filter((el) => el.type === 'Моментальная') : []),
  ];
  return filteredCameras;
};

const sortCameras = (cameras: Camera[], type: SortType.Price | SortType.Rating, order: SortOrder.Ascending | SortOrder.Descending) => {
  if (order === SortOrder.Ascending) {
    return cameras.sort((a, b) => a[type] - b[type]);
  }
  return cameras.sort((a, b) => b[type] - a[type]);
};

function Catalog(): JSX.Element {
  const ad = useAppSelector(selectPromo);
  const navigate = useNavigate();
  const pageParams = usePageParams();
  const cameras = useAppSelector(selectCameras);

  if (pageParams === undefined ||
    (pageParams.sortType !== SortType.Price && pageParams.sortType !== SortType.Rating) ||
    (pageParams.order !== SortOrder.Ascending && pageParams.order !== SortOrder.Descending)) {
    return <Navigate to={AppRoute.Unknown()} />;
  }

  const { page, sortType, order } = pageParams;

  const filteredCameras = filterCameras(cameras.slice(), pageParams);

  const sortedCameras = sortCameras(filteredCameras.slice(), sortType, order);

  const totalPageAmount = Math.ceil(filteredCameras.length / CARDSONPAGE);

  const handleSortTypeButtonClick = (evt: React.ChangeEvent) => {
    const newSortType = evt.currentTarget.id;
    navigate(AppRoute.Catalog({ ...pageParams, sortType: newSortType }));
  };

  const handleSortOrderButtonClick = (evt: React.ChangeEvent) => {
    const newSortOrderType = evt.currentTarget.id;
    navigate(AppRoute.Catalog({ ...pageParams, order: newSortOrderType }));
  };

  if (page) {
    const camerasToRender = sortedCameras.slice((+page - 1) * CARDSONPAGE, +page * CARDSONPAGE);
    if (camerasToRender.length === 0 && cameras.length !== 0) {
      navigate(AppRoute.Unknown());
    }

    return (
      <>
        <Ad ad={ad} />
        <div data-testid="catalog-page" className="page-content">
          <div data-testid="breadcrumbs" className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link className="breadcrumbs__link" to={AppRoute.Catalog(INITIAL_CATALOG_PAGE_URL_PARAMS)}>Главная
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
                <CatalogFilter params={pageParams} />
                <div className="catalog__content">
                  <CatalogSort handleSortTypeButtonClick={handleSortTypeButtonClick} handleSortOrderButtonClick={handleSortOrderButtonClick} params={pageParams} />
                  <CatalogGallery cameras={camerasToRender} />
                  <CatalogPagination params={pageParams} totalPageAmount={totalPageAmount} />
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
