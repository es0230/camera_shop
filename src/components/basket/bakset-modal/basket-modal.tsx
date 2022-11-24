import { useCallback, useEffect } from 'react';
import Modal from 'react-modal';
import { FilterCategories, KEY_EVENT_TYPE, KEY_NAME_ESC, ProductCategories } from '../../../const';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { makeFakeCamera } from '../../../mocks/mocks';
import { toggleModalOpened } from '../../../store/app-data/app-data';
import { selectCurrentProduct, selectModalOpened } from '../../../store/app-data/selectors';
import { removeAllFromBasket } from '../../../store/user-data/user-data';

Modal.defaultStyles = {};

function BasketModal(): JSX.Element {
  const isOpened = useAppSelector(selectModalOpened);
  const dispatch = useAppDispatch();
  const currentCamera = useAppSelector(selectCurrentProduct) || makeFakeCamera();
  const { name, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, vendorCode, type, category, level } = currentCamera;

  const handleDeleteItemClick = () => {
    dispatch(removeAllFromBasket(currentCamera));
    handleModalClosing();
  };

  const handleModalClosing = useCallback(() => {
    if (isOpened) {
      dispatch(toggleModalOpened());
    }
  }, [dispatch, isOpened]);

  const handleEscKey = useCallback((evt: KeyboardEvent) => {
    if (evt.key === KEY_NAME_ESC) {
      handleModalClosing();
    }
  }, [handleModalClosing]);

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
      <div className="modal is-active">
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={handleModalClosing}></div>
          <div className="modal__content">
            <p className="title title--h4">Удалить этот товар?</p>
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
              </div>
            </div>
            <div className="modal__buttons">
              <button data-testid="deleteButton" className="btn btn--purple modal__btn modal__btn--half-width" type="button" onClick={handleDeleteItemClick}>Удалить</button>
              <button className="btn btn--transparent modal__btn modal__btn--half-width" onClick={handleModalClosing}>Продолжить покупки</button>
            </div>
            <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={handleModalClosing}>
              <svg width="10" height="10" aria-hidden="true">
                <use xlinkHref="#icon-close" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default BasketModal;
