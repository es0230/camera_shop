//import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Ad from '../../components/ad/ad';
import CatalogGallery from '../../components/catalog/catalog-content/catalog-gallery/catalog-gallery';
import CatalogPagination from '../../components/catalog/catalog-content/catalog-pagination/catalog-pagination';
import CatalogSort from '../../components/catalog/catalog-content/catalog-sort/catalog-sort';
import CatalogFilter from '../../components/catalog/catalog-filter/catalog-filter';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { AppRoute, INITIAL_PAGE } from '../../const';
import { useAppSelector } from '../../hooks';
import { usePageNumber } from '../../hooks/use-page-number';
import { selectCameras, selectPromo } from '../../store/app-data/selectors';

const CARDSONPAGE = 9;

function Catalog(): JSX.Element {
  const ad = useAppSelector(selectPromo);
  const currentPage = usePageNumber();
  const cameras = useAppSelector(selectCameras);
  const navigate = useNavigate();

  const totalPageAmount = Math.ceil(cameras.length / CARDSONPAGE);
  if (currentPage) {
    const camerasToRender = cameras.slice((currentPage - 1) * CARDSONPAGE, currentPage * CARDSONPAGE);
    if (camerasToRender.length === 0 && cameras.length !== 0) {
      navigate(AppRoute.Unknown());
    }

    return (
      <>
        <Header />
        <Ad ad={ad} />
        <div className="page-content">
          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link className="breadcrumbs__link" to={AppRoute.Catalog(INITIAL_PAGE)}>Главная
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
                <CatalogFilter />
                <div className="catalog__content">
                  <CatalogSort />
                  <CatalogGallery cameras={camerasToRender} />
                  <CatalogPagination currentPage={currentPage} totalPageAmount={totalPageAmount} />
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </>
    );
  }

  navigate(AppRoute.Unknown());
  return (<> </>);
}

export default Catalog;
