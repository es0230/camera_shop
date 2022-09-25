//import { useState } from 'react';
import Ad from '../../components/ad/ad';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import CatalogGallery from '../../components/catalog/catalog-content/catalog-gallery/catalog-gallery';
import CatalogPagination from '../../components/catalog/catalog-content/catalog-pagination/catalog-pagination';
import CatalogSort from '../../components/catalog/catalog-content/catalog-sort/catalog-sort';
import CatalogFilter from '../../components/catalog/catalog-filter/catalog-filter';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useAppSelector } from '../../hooks';
import { usePageNumber } from '../../hooks/use-page-number';
import { selectCameras, selectPromo } from '../../store/app-data/selectors';

const CARDSONPAGE = 9;

function Catalog(): JSX.Element {
  const ad = useAppSelector(selectPromo);
  const currentPage = usePageNumber();
  // eslint-disable-next-line no-console
  //console.log(page);
  //const [currentPage,] = useState(1);
  const cameras = useAppSelector(selectCameras);
  const totalPageAmount = Math.ceil(cameras.length / CARDSONPAGE);
  if (currentPage) {
    const camerasToRender = cameras.slice((currentPage - 1) * CARDSONPAGE, currentPage * CARDSONPAGE);

    return (
      <>
        <Header />
        <Ad ad={ad} />
        <div className="page-content">
          <Breadcrumbs />
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

  return (<h1>Не удалось загрузить предложения. Вернитесь позже.</h1>);
}

export default Catalog;
