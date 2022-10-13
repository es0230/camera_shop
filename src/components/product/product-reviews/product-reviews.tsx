import { useEffect, useState } from 'react';
import { INITIAL_REVIEWS } from '../../../const';
import { Review } from '../../../types/review';
import ReviewCard from '../review-card/review-card';

type ProductReviewsProps = {
  reviews: Review[],
  setModalOpened: React.Dispatch<React.SetStateAction<boolean>>,
}

function ProductReviews({ reviews, setModalOpened }: ProductReviewsProps): JSX.Element {
  const [reviewsToShow, setReviewsToShow] = useState(INITIAL_REVIEWS);

  useEffect(() => {
    setReviewsToShow(3);
  }, [reviews]);

  return (
    <section data-testid="product-reviews-component" className="review-block">
      <div className="container">
        <div className="page-content__headed">
          <h2 className="title title--h3">Отзывы</h2>
          <button className="btn" type="button" onClick={() => setModalOpened(true)} >Оставить свой отзыв</button>
        </div>
        {reviews?.map((el, i) => i < reviewsToShow && <ReviewCard reviewData={el} key={el.id} />)}
        {reviewsToShow < (reviews?.length || 0) &&
          <div className="review-block__buttons">
            <button className="btn btn--purple" type="button" onClick={() => setReviewsToShow(reviewsToShow + 3)}>Показать больше отзывов</button>
          </div>}
      </div>
    </section>

  );
}

export default ProductReviews;
