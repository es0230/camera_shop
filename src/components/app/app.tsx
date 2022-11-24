import { Navigate, Route, Routes } from 'react-router-dom';
import { AppRoute, INITIAL_CATALOG_PAGE_URL_PARAMS } from '../../const';
import Basket from '../../pages/basket/basket';
import Catalog from '../../pages/catalog/catalog';
import OrderFailed from '../../pages/order-failed/order-failed';
import PageNotFound from '../../pages/page-not-found/page-not-found';
import Product from '../../pages/product/product';
import Layout from '../layout/layout';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path={'/'} element={<Layout />}>
        <Route path={AppRoute.Catalog()} element={<Catalog />} />
        <Route path={AppRoute.Product()} element={<Product />} />
        <Route path={AppRoute.Basket()} element={<Basket />} />
        <Route index element={<Navigate to={AppRoute.Catalog(INITIAL_CATALOG_PAGE_URL_PARAMS)} replace />} />
      </Route>
      <Route path={AppRoute.OrderFailed()} element={<OrderFailed />} />
      <Route path={AppRoute.Unknown()} element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
