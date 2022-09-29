import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
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
import { Review } from '../../types/review';

function Product(): JSX.Element {
  const [currentProduct, setCurrentProduct] = useState<Camera>();
  const [currentReviews, setCurrentReviews] = useState<Review[]>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    api.get<Camera>(`${APIRoute.Cameras}/${id}`)
      .then(({ data }) => setCurrentProduct(data))
      .catch(() => navigate(AppRoute.Unknown));
    api.get<Review[]>(`${APIRoute.Cameras}/${id}/reviews`)
      .then(({ data }) => {
        data.sort((a, b) => (dayjs(a.createAt).isAfter(b.createAt) ? -1 : 1));
        return setCurrentReviews(data);
      });
  }, [id, navigate]);

  if (currentProduct === undefined) {
    return <LoadingScreen />;
  }

  return (
    <div className="wrapper" id="top">
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
            <SimilarProducts id={Number(id)} />
          </div>
          <div className="page-content__section">
            <ProductReviews reviews={currentReviews} />
          </div>
        </div>
      </main>
      <ScrollLink
        className='up-btn'
        to="top"
        smooth
        duration={500}
      >
        <svg width="12" height="18" aria-hidden="true">
          <use xlinkHref="#icon-arrow2" />
        </svg>
      </ScrollLink>
      <Footer />
    </div>
  );
}

export default Product;
