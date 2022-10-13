import { useEffect, useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import LoadingScreen from '../../components/loading-screen/loading-screen';
import ProductCard from '../../components/product/product-card/product-card';
import ProductReviews from '../../components/product/product-reviews/product-reviews';
import SimilarProducts from '../../components/product/similar-products/similar-products';
import { AppRoute, INITIAL_PAGE, TabType } from '../../const';
import PageNotFound from '../page-not-found/page-not-found';
import ReviewModal from '../../components/product/review-modal/review-modal';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCameraAction, fetchReviewsAction, fetchSimilarProductsAction } from '../../store/api-actions';
import { selectCurrentProduct, selectCurrentReviews, selectCurrentSimilarProducts } from '../../store/app-data/selectors';

function Product(): JSX.Element {
  const { id, tabType } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [modalOpened, setModalOpened] = useState(false);
  const [isNeededUpdate, setIsNeededUpdate] = useState(true);

  useEffect(() => {
    if (tabType !== TabType.Description && tabType !== TabType.Perks) {
      navigate(AppRoute.Unknown());
    }
  }, [navigate, tabType]);

  useEffect(() => {
    dispatch(fetchCameraAction(id));
    dispatch(fetchReviewsAction(id));
    dispatch(fetchSimilarProductsAction(id));
    setIsNeededUpdate(false);
  }, [dispatch, id, isNeededUpdate]);

  const currentProduct = useAppSelector(selectCurrentProduct);
  const currentReviews = useAppSelector(selectCurrentReviews);
  const currentSimilarProducts = useAppSelector(selectCurrentSimilarProducts);

  if (currentProduct === null) {
    return <PageNotFound />;
  }

  if (currentProduct === undefined) {
    return <LoadingScreen />;
  }

  return (
    <div data-testid="product-page" className="wrapper" id="top">
      <Header />
      <main>
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
                  <Link className="breadcrumbs__link" to={AppRoute.Catalog(INITIAL_PAGE)}>Каталог
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
            <SimilarProducts id={Number(id)} similarProducts={currentSimilarProducts} />
          </div>
          <div className="page-content__section">
            <ProductReviews reviews={currentReviews} setModalOpened={setModalOpened} />
          </div>
        </div>
        <ReviewModal isActive={modalOpened} setIsActive={setModalOpened} setIsNeededUpdate={setIsNeededUpdate} />
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
