import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import LoadingScreen from '../../components/loading-screen/loading-screen';
import ProductCard from '../../components/product/product-card/product-card';
import ProductReviews from '../../components/product/product-reviews/product-reviews';
import SimilarProducts from '../../components/product/similar-products/similar-products';
import { APIRoute, AppRoute } from '../../const';
import { api } from '../../store';
import { Camera } from '../../types/camera';

function Product(): JSX.Element {
  const [currentProduct, setCurrentProduct] = useState<Camera>();
  const { id } = useParams();
  const navigate = useNavigate();
  // eslint-disable-next-line no-console
  console.log(id);

  useEffect(() => {
    api.get<Camera>(`${APIRoute.Cameras}/${id}`)
      .then(({ data }) => setCurrentProduct(data))
      .catch(() => navigate(AppRoute.Unknown));
  }, [id, navigate]);

  if (currentProduct === undefined) {
    return <LoadingScreen />;
  }

  return (
    <div className="wrapper">
      <Header />
      <main>
        <div className="page-content">
          <Breadcrumbs />
          <div className="page-content__section">
            <ProductCard currentProduct={currentProduct} />
          </div>
          <div className="page-content__section">
            <SimilarProducts />
          </div>
          <div className="page-content__section">
            <ProductReviews />
          </div>
        </div>
      </main>
      <a className="up-btn" href="#header">
        <svg width="12" height="18" aria-hidden="true">
          <use xlinkHref="#icon-arrow2" />
        </svg>
      </a>
      <Footer />
    </div>
  );
}

export default Product;
