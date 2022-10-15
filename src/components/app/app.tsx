import { Navigate, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import Catalog from '../../pages/catalog/catalog';
import PageNotFound from '../../pages/page-not-found/page-not-found';
import Product from '../../pages/product/product';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path={AppRoute.Catalog()} element={<Catalog />} />
      <Route path={AppRoute.Product()} element={<Product />} />
      <Route path={AppRoute.Unknown()} element={<PageNotFound />} />
      <Route path={'/'} element={<Navigate to={AppRoute.Catalog(1)} replace />} />
    </Routes>
  );
}

export default App;
