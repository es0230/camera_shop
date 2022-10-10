import { MAX_RATING } from '../../../const';
import { Review } from '../../../types/review';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

type ReviewCardProps = {
  reviewData: Review,
}

function ReviewCard({ reviewData }: ReviewCardProps): JSX.Element {
  const { rating, userName, advantage, disadvantage, review, createAt } = reviewData;
  return (
    <li className="review-card">
      <div className="review-card__head">
        <p className="title title--h4">{userName}</p>
        <time className="review-card__data" dateTime={dayjs(createAt).format('YYYY-MM-DD')}>{dayjs(createAt).locale('ru').format('DD MMMM')}</time>
      </div>
      <div className="rate review-card__rate">
        {Array.from({ length: MAX_RATING }, ((el, i) => (
          i < rating ?
            <svg width="17" height="16" aria-hidden="true" key={i} data-testid="full_star">
              <use xlinkHref="#icon-full-star" />
            </svg> :
            <svg width="17" height="16" aria-hidden="true" key={i} data-testid="star">
              <use xlinkHref="#icon-star" />
            </svg>
        ))
        )}
        <p className="visually-hidden">Оценка: 5</p>
      </div>
      <ul className="review-card__list">
        <li className="item-list"><span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">{advantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">{disadvantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">{review}</p>
        </li>
      </ul>
    </li>
  );
}

export default ReviewCard;
