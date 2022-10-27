import { Navigate, Route, Routes } from 'react-router-dom';
import { AppRoute, INITIAL_CATALOG_PAGE_URL_PARAMS } from '../../const';
import Catalog from '../../pages/catalog/catalog';
import PageNotFound from '../../pages/page-not-found/page-not-found';
import Product from '../../pages/product/product';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path={AppRoute.Catalog()} element={<Catalog />} />
      <Route path={AppRoute.Product()} element={<Product />} />
      <Route path={AppRoute.Unknown()} element={<PageNotFound />} />
      <Route path={'/'} element={<Navigate to={AppRoute.Catalog(INITIAL_CATALOG_PAGE_URL_PARAMS)} replace />} />
    </Routes>
  );
}

export default App;
