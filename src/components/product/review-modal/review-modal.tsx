import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ReviewPost } from '../../../types/review-post';

const MIN_REVIEW_LENGTH = 5;

type ReviewModalProps = {
  isActive: boolean,
}

enum ReviewInputMap {
  'user-name' = 'userName',
  'user-plus' = 'advantage',
  'user-minus' = 'disadvantage',
  'user-comment' = 'review',
  'rate' = 'rating'
}

function ReviewModal({ isActive }: ReviewModalProps): JSX.Element {
  const { id } = useParams();

  const initialState: ReviewPost = {
    cameraId: Number(id),
    userName: '',
    advantage: '',
    disadvantage: '',
    review: '',
    rating: 0,
  };

  const [review, setReview] = useState<ReviewPost>(initialState);

  const handleReviewWriting = (evt: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>) => {
    const { value, name } = evt.currentTarget;
    setReview({ ...review, [Object(ReviewInputMap)[name]]: value });
  };

  const handleReviewRatingChoice = (evt: React.FormEvent<HTMLInputElement>) => {
    const { value, name } = evt.currentTarget;
    setReview({ ...review, [Object(ReviewInputMap)[name]]: Number(value) });
  };

  return (
    <div className={`modal ${isActive ? 'is-active' : ''}`}>
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content">
          <p className="title title--h4">Оставить отзыв</p>
          <div className="form-review">
            <form method="post">
              <div className="form-review__rate">
                <fieldset className="rate form-review__item">
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
                <div className="custom-input form-review__item">
                  <label>
                    <span className="custom-input__label">Ваше имя
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input type="text" name="user-name" placeholder="Введите ваше имя" required onInput={handleReviewWriting} value={review.userName} />
                  </label>
                  <p className="custom-input__error">Нужно указать имя</p>
                </div>
                <div className="custom-input form-review__item">
                  <label>
                    <span className="custom-input__label">Достоинства
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input type="text" name="user-plus" placeholder="Основные преимущества товара" required onInput={handleReviewWriting} value={review.advantage} />
                  </label>
                  <p className="custom-input__error">Нужно указать достоинства</p>
                </div>
                <div className="custom-input form-review__item">
                  <label>
                    <span className="custom-input__label">Недостатки
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input type="text" name="user-minus" placeholder="Главные недостатки товара" required onInput={handleReviewWriting} value={review.disadvantage} />
                  </label>
                  <p className="custom-input__error">Нужно указать недостатки</p>
                </div>
                <div className="custom-textarea form-review__item">
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
              <button className="btn btn--purple form-review__btn" type="submit">Отправить отзыв</button>
            </form>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап">
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReviewModal;
