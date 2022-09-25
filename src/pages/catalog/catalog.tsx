import Ad from '../../components/ad/ad';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import CatalogGallery from '../../components/catalog/catalog-content/catalog-gallery/catalog-gallery';
import CatalogPagination from '../../components/catalog/catalog-content/catalog-pagination/catalog-pagination';
import CatalogSort from '../../components/catalog/catalog-content/catalog-sort/catalog-sort';
import CatalogFilter from '../../components/catalog/catalog-filter/catalog-filter';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useAppSelector } from '../../hooks';
import { selectPromo } from '../../store/app-data/selectors';

function Catalog(): JSX.Element {
  const ad = useAppSelector(selectPromo);

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
                <CatalogGallery />
                <CatalogPagination />
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Catalog;
