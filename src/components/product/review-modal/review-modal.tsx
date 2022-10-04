import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { APIRoute } from '../../../const';
import { api } from '../../../store';
import { Review } from '../../../types/review';
import { ReviewPost } from '../../../types/review-post';
import Modal from 'react-modal';

const MIN_REVIEW_LENGTH = 5;

type ReviewModalProps = {
  isActive: boolean,
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>,
  currentReviews: Review[] | undefined,
  setCurrentReviews: React.Dispatch<React.SetStateAction<Review[] | undefined>>,
}

enum ReviewInputMap {
  'user-name' = 'userName',
  'user-plus' = 'advantage',
  'user-minus' = 'disadvantage',
  'user-comment' = 'review',
  'rate' = 'rating'
}

const KEY_NAME_ESC = 'Escape';
const KEY_EVENT_TYPE = 'keyup';

Modal.defaultStyles = {};

function ReviewModal({ isActive, setIsActive, currentReviews, setCurrentReviews }: ReviewModalProps): JSX.Element {

  const { id } = useParams();

  const initialFieldsChanged = useMemo(() => ({
    userName: false,
    advantage: false,
    disadvantage: false,
    review: false,
    rating: false,
  }), []);

  const initialFormState: ReviewPost = useMemo(() => ({
    cameraId: Number(id),
    userName: '',
    advantage: '',
    disadvantage: '',
    review: '',
    rating: 0,
  }), [id]);

  const [review, setReview] = useState<ReviewPost>(initialFormState);
  const [fieldChanged, setFieldChanged] = useState(initialFieldsChanged);
  const [sendReview, setSendReview] = useState(false);
  const [reviewSucceed, setReviewSucceed] = useState(false);

  const handleModalClosing = useCallback(() => {
    setIsActive(false);
    setReview(initialFormState);
    setFieldChanged(initialFieldsChanged);
    if (reviewSucceed) {
      setReviewSucceed(false);
    }
  }, [initialFieldsChanged, initialFormState, reviewSucceed, setIsActive]);

  const handleEscKey = useCallback((evt: KeyboardEvent) => {
    if (evt.key === KEY_NAME_ESC) {
      handleModalClosing();
    }
  }, [handleModalClosing]);

  useEffect(() => {
    if (sendReview) {
      api.post<Review>(APIRoute.Reviews, review)
        .then(({ data }) => {
          if (currentReviews === undefined) {
            setCurrentReviews([data]);
          } else {
            setCurrentReviews([...currentReviews, data]);
          }
          setReview(initialFormState);
          setFieldChanged(initialFieldsChanged);
          setReviewSucceed(true);
        });
      setSendReview(false);
    }
  }, [sendReview, review, setCurrentReviews, currentReviews, initialFormState, initialFieldsChanged]);

  useEffect(() => {
    if (isActive) {
      const scrollWidth = window.innerWidth - document.body.offsetWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollWidth}px`;
    }

    return () => {
      document.body.style.overflow = 'visible';
      document.body.style.paddingRight = '0';
    };
  }, [isActive]);

  useEffect(() => {
    document.addEventListener(KEY_EVENT_TYPE, handleEscKey);

    return () => {
      document.removeEventListener(KEY_EVENT_TYPE, handleEscKey);
    };
  }, [handleEscKey, handleModalClosing, isActive, setIsActive]);

  const handleReviewWriting = (evt: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>) => {
    const { value, name } = evt.currentTarget;
    setReview({ ...review, [Object(ReviewInputMap)[name]]: value });
    setFieldChanged({ ...fieldChanged, [Object(ReviewInputMap)[name]]: true });
  };

  const handleReviewRatingChoice = (evt: React.FormEvent<HTMLInputElement>) => {
    const { value, name } = evt.currentTarget;
    setReview({ ...review, [Object(ReviewInputMap)[name]]: Number(value) });
    setFieldChanged({ ...fieldChanged, [Object(ReviewInputMap)[name]]: true });
  };

  const handleReviewSending = (evt: React.FormEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (
      review.userName !== initialFormState.userName &&
      review.advantage !== initialFormState.advantage &&
      review.disadvantage !== initialFormState.disadvantage &&
      review.rating !== 0 &&
      review.review.length >= 5
    ) {
      setSendReview(true);
    } else {
      setFieldChanged({
        userName: true,
        advantage: true,
        disadvantage: true,
        review: true,
        rating: true,
      });
    }
  };

  return (
    <Modal isOpen={isActive} style={{ overlay: { backgroundColor: 'transparent' } }}>
      <div className={`modal ${isActive ? 'is-active' : ''} ${reviewSucceed ? 'modal--narrow' : ''}`}>
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={handleModalClosing}></div>
          {reviewSucceed ?
            <div className="modal__content">
              <p className="title title--h4">Спасибо за отзыв</p>
              <svg className="modal__icon" width="80" height="78" aria-hidden="true">
                <use xlinkHref="#icon-review-success"></use>
              </svg>
              <div className="modal__buttons">
                <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button" onClick={handleModalClosing}>Вернуться к покупкам
                </button>
              </div>
              <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={handleModalClosing}>
                <svg width="10" height="10" aria-hidden="true">
                  <use xlinkHref="#icon-close"></use>
                </svg>
              </button>
            </div>
            :
            <div className="modal__content">
              <p className="title title--h4">Оставить отзыв</p>
              <div className="form-review">
                <form method="post">

                  <div className="form-review__rate">
                    <fieldset className={`rate form-review__item ${review.rating === 0 && fieldChanged.rating ? 'is-invalid' : ''}`}>
                      <legend className="rate__caption">Рейтинг
                        <svg width="9" height="9" aria-hidden="true">
                          <use xlinkHref="#icon-snowflake"></use>
                        </svg>
                      </legend>
                      <div className="rate__bar">
                        <div className="rate__group">
                          <input className="visually-hidden" id="star-5" name="rate" type="radio" value={5} onClick={handleReviewRatingChoice} />
                          <label className="rate__label" htmlFor="star-5" title="Отлично" />
                          <input className="visually-hidden" id="star-4" name="rate" type="radio" value={4} onClick={handleReviewRatingChoice} />
                          <label className="rate__label" htmlFor="star-4" title="Хорошо" />
                          <input className="visually-hidden" id="star-3" name="rate" type="radio" value={3} onClick={handleReviewRatingChoice} />
                          <label className="rate__label" htmlFor="star-3" title="Нормально" />
                          <input className="visually-hidden" id="star-2" name="rate" type="radio" value={2} onClick={handleReviewRatingChoice} />
                          <label className="rate__label" htmlFor="star-2" title="Плохо" />
                          <input className="visually-hidden" id="star-1" name="rate" type="radio" value={1} onClick={handleReviewRatingChoice} />
                          <label className="rate__label" htmlFor="star-1" title="Ужасно" />
                        </div>
                        <div className="rate__progress">
                          <span className="rate__stars">{review.rating}</span> <span>/</span> <span className="rate__all-stars">5</span>
                        </div>
                      </div>
                      <p className="rate__message">Нужно оценить товар</p>
                    </fieldset>
                    <div className={`custom-input form-review__item ${review.userName.length === 0 && fieldChanged.userName ? 'is-invalid' : ''}`}>
                      <label>
                        <span className="custom-input__label">Ваше имя
                          <svg width="9" height="9" aria-hidden="true">
                            <use xlinkHref="#icon-snowflake"></use>
                          </svg>
                        </span>
                        <input type="text" name="user-name" placeholder="Введите ваше имя" onInput={handleReviewWriting} value={review.userName} />
                      </label>
                      <p className="custom-input__error">Нужно указать имя</p>
                    </div>
                    <div className={`custom-input form-review__item ${review.advantage.length === 0 && fieldChanged.advantage ? 'is-invalid' : ''}`}>
                      <label>
                        <span className="custom-input__label">Достоинства
                          <svg width="9" height="9" aria-hidden="true">
                            <use xlinkHref="#icon-snowflake"></use>
                          </svg>
                        </span>
                        <input type="text" name="user-plus" placeholder="Основные преимущества товара" onInput={handleReviewWriting} value={review.advantage} />
                      </label>
                      <p className="custom-input__error">Нужно указать достоинства</p>
                    </div>
                    <div className={`custom-input form-review__item ${review.disadvantage.length === 0 && fieldChanged.disadvantage ? 'is-invalid' : ''}`}>
                      <label>
                        <span className="custom-input__label">Недостатки
                          <svg width="9" height="9" aria-hidden="true">
                            <use xlinkHref="#icon-snowflake"></use>
                          </svg>
                        </span>
                        <input type="text" name="user-minus" placeholder="Главные недостатки товара" onInput={handleReviewWriting} value={review.disadvantage} />
                      </label>
                      <p className="custom-input__error">Нужно указать недостатки</p>
                    </div>
                    <div className={`custom-textarea form-review__item ${review.review.length < MIN_REVIEW_LENGTH && fieldChanged.review ? 'is-invalid' : ''}`}>
                      <label>
                        <span className="custom-textarea__label">Комментарий
                          <svg width="9" height="9" aria-hidden="true">
                            <use xlinkHref="#icon-snowflake"></use>
                          </svg>
                        </span>
                        <textarea name="user-comment" minLength={MIN_REVIEW_LENGTH} placeholder="Поделитесь своим опытом покупки" onInput={handleReviewWriting} value={review.review}></textarea>
                      </label>
                      <div className="custom-textarea__error">Нужно добавить комментарий</div>
                    </div>
                  </div>
                  <button className="btn btn--purple form-review__btn" type="button" onClick={(evt) => handleReviewSending(evt)} >Отправить отзыв</button>
                </form>
              </div>
              <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={handleModalClosing}>
                <svg width="10" height="10" aria-hidden="true">
                  <use xlinkHref="#icon-close"></use>
                </svg>
              </button>
            </div>}
        </div>
      </div>
    </Modal>

  );
}

export default ReviewModal;
