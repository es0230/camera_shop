import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link" href="index.html">Главная
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </a>
                </li>
                <li className="breadcrumbs__item">
                  <Link className="breadcrumbs__link" to={'/catalog/1'}>Каталог
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </Link>
                </li>
                <li className="breadcrumbs__item">
                  <span className="breadcrumbs__link breadcrumbs__link--active">{currentProduct.name}</span>
                </li>
              </ul>
            </div>
          </div>
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
