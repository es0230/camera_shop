import { useCallback, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppRoute, FilterCategories, INITIAL_CATALOG_PAGE_URL_PARAMS, KEY_EVENT_TYPE, KEY_NAME_ESC, ProductCategories } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { makeFakeCamera } from '../../mocks/mocks';
import { toggleModalOpened } from '../../store/app-data/app-data';
import { selectCurrentProduct, selectModalOpened } from '../../store/app-data/selectors';
import { addToBasket } from '../../store/user-data/user-data';

Modal.defaultStyles = {};

const PRODUCTPAGEINDICATOR = '/product';

function ProductModal(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [productAdded, setProductAdded] = useState(false);
  const isOpened = useAppSelector(selectModalOpened);
  const camera = useAppSelector(selectCurrentProduct) || makeFakeCamera();
  const { name, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, price, vendorCode, type, category, level } = camera;
  const isOnProductPage = useLocation().pathname.includes(PRODUCTPAGEINDICATOR);

  const handleAddToBasketClick = () => {
    dispatch(addToBasket(camera));
    setProductAdded(true);
  };

  const handleModalClosing = useCallback(() => {
    dispatch(toggleModalOpened());
    if (productAdded) {
      setProductAdded(false);
    }
  }, [dispatch, productAdded]);

  const handleBackToShoppingOnProductPageClick = () => {
    dispatch(toggleModalOpened());
    if (productAdded) {
      setProductAdded(false);
    }
    navigate(AppRoute.Catalog(INITIAL_CATALOG_PAGE_URL_PARAMS));
  };

  const handleEscKey = useCallback((evt: KeyboardEvent) => {
    if (evt.key === KEY_NAME_ESC) {
      handleModalClosing();
    }
  }, [handleModalClosing]);

  const handleGoToBasketClick = () => {
    dispatch(toggleModalOpened());
    navigate(AppRoute.Basket());
  };

  useEffect(() => {
    document.addEventListener(KEY_EVENT_TYPE, handleEscKey);

    return () => {
      document.removeEventListener(KEY_EVENT_TYPE, handleEscKey);
    };
  }, [handleEscKey]);

  useEffect(() => {
    if (isOpened) {
      const scrollWidth = window.innerWidth - document.body.offsetWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollWidth}px`;
    }

    return () => {
      document.body.style.overflow = 'visible';
      document.body.style.paddingRight = '0';
    };
  }, [isOpened]);

  return (
    <Modal isOpen={isOpened} style={{ overlay: { backgroundColor: 'transparent' } }}>
      <div className={`modal is-active ${productAdded ? 'modal--narrow' : ''}`}>
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={handleModalClosing}></div>
          {productAdded ?
            <div className="modal__content">
              <p className="title title--h4">Товар успешно добавлен в корзину</p>
              <svg className="modal__icon" width="86" height="80" aria-hidden="true">
                <use xlinkHref="#icon-success"></use>
              </svg>
              <div className="modal__buttons">
                <button className="btn btn--transparent modal__btn" onClick={isOnProductPage ? handleBackToShoppingOnProductPageClick : handleModalClosing}>Продолжить покупки</button>
                <button className="btn btn--purple modal__btn modal__btn--fit-width" onClick={handleGoToBasketClick}>Перейти в корзину</button>
              </div>
              <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={handleModalClosing}>
                <svg width="10" height="10" aria-hidden="true">
                  <use xlinkHref="#icon-close"></use>
                </svg>
              </button>
            </div> :
            <div className="modal__content">
              <p className="title title--h4">Добавить товар в корзину</p>
              <div className="basket-item basket-item--short">
                <div className="basket-item__img">
                  <picture>
                    <source type="image/webp" srcSet={`../../${previewImgWebp}, ../../${previewImgWebp2x} 2x`} />
                    <img src={`../../${previewImg}`} srcSet={`../../${previewImg2x} 2x`} width="140" height="120" alt={name} />
                  </picture>
                </div>
                <div className="basket-item__description">
                  <p className="basket-item__title">{name}</p>
                  <ul className="basket-item__list">
                    <li className="basket-item__list-item">
                      <span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{vendorCode}</span>
                    </li>
                    <li className="basket-item__list-item">{type} {category === FilterCategories.Photo ? ProductCategories.Photo : ProductCategories.Video}</li>
                    <li className="basket-item__list-item">{level} уровень</li>
                  </ul>
                  <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{price} ₽</p>
                </div>
              </div>
              <div className="modal__buttons">
                <button data-testid="addToBasketButton" className="btn btn--purple modal__btn modal__btn--fit-width" type="button" onClick={handleAddToBasketClick}>
                  <svg width="24" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-add-basket" />
                  </svg>
                  Добавить в корзину
                </button>
              </div>
              <button data-testid="closeButton" className="cross-btn" type="button" aria-label="Закрыть попап" onClick={handleModalClosing}>
                <svg width="10" height="10" aria-hidden="true">
                  <use xlinkHref="#icon-close" />
                </svg>
              </button>
            </div>}
        </div>
      </div>
    </Modal >
  );
}

export default ProductModal;
