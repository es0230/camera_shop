/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ProductCard from '../../components/product/product-card/product-card';
import ProductReviews from '../../components/product/product-reviews/product-reviews';
import SimilarProducts from '../../components/product/similar-products/similar-products';
import { AppRoute, INITIAL_CATALOG_PAGE_URL_PARAMS, TabType } from '../../const';
import PageNotFound from '../page-not-found/page-not-found';
import ReviewModal from '../../components/product/review-modal/review-modal';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCameraAction, fetchReviewsAction, fetchSimilarProductsAction } from '../../store/api-actions';
import { selectCurrentProduct, selectCurrentReviews, selectCurrentSimilarProducts } from '../../store/app-data/selectors';

function Product(): JSX.Element {
  const { id, tabType } = useParams();
  const [searchParams] = useSearchParams();
  console.log(searchParams.get('tabType'));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [modalOpened, setModalOpened] = useState(false);
  const [isNeededUpdate, setIsNeededUpdate] = useState(false);

  useEffect(() => {
    dispatch(fetchCameraAction(id));
    dispatch(fetchSimilarProductsAction(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchReviewsAction(id));
    setIsNeededUpdate(false);
  }, [dispatch, id, isNeededUpdate]);

  if (tabType !== TabType.Description && tabType !== TabType.Perks) {
    navigate(AppRoute.Unknown());
  }

  const currentProduct = useAppSelector(selectCurrentProduct);
  const currentReviews = useAppSelector(selectCurrentReviews);
  const currentSimilarProducts = useAppSelector(selectCurrentSimilarProducts);

  if (currentProduct === null) {
    return <PageNotFound />;
  }

  return (
    <div data-testid="product-page" className="wrapper" id="top">
      <main>
        <div className="page-content">
          <div data-testid="breadcrumbs" className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link className="breadcrumbs__link" to={AppRoute.Catalog(INITIAL_CATALOG_PAGE_URL_PARAMS)}>Главная
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </Link>
                </li>
                <li className="breadcrumbs__item">
                  <Link className="breadcrumbs__link" to={AppRoute.Catalog(INITIAL_CATALOG_PAGE_URL_PARAMS)}>Каталог
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
        data-testid="up-button"
        className='up-btn'
        to="top"
        smooth
        duration={500}
      >
        <svg width="12" height="18" aria-hidden="true">
          <use xlinkHref="#icon-arrow2" />
        </svg>
      </ScrollLink>
    </div>
  );
}

export default Product;
