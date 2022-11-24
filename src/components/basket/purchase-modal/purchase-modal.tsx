import { useCallback, useEffect } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { AppRoute, INITIAL_CATALOG_PAGE_URL_PARAMS, KEY_EVENT_TYPE, KEY_NAME_ESC, OrderStatus } from '../../../const';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectOrderStatus } from '../../../store/user-data/selectors';
import { resetOrderStatus } from '../../../store/user-data/user-data';

Modal.defaultStyles = {};

function PurchaseModal(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isOpened = useAppSelector(selectOrderStatus) === OrderStatus.Success;

  const handleBackToShoppingClick = () => {
    dispatch(resetOrderStatus());
    navigate(AppRoute.Catalog(INITIAL_CATALOG_PAGE_URL_PARAMS));
  };

  const handleModalClosing = useCallback(() => {
    dispatch(resetOrderStatus());
  }, [dispatch]);

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
      <div className="modal is-active modal--narrow">
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={handleModalClosing}></div>
          <div className="modal__content">
            <p className="title title--h4">Спасибо за покупку</p>
            <svg className="modal__icon" width="80" height="78" aria-hidden="true">
              <use xlinkHref="#icon-review-success"></use>
            </svg>
            <div className="modal__buttons">
              <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button" onClick={handleBackToShoppingClick}>Вернуться к покупкам
              </button>
            </div>
            <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={handleModalClosing}>
              <svg width="10" height="10" aria-hidden="true">
                <use xlinkHref="#icon-close"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Modal>

  );
}

export default PurchaseModal;
