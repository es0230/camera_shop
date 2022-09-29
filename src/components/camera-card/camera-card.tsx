import { Camera } from '../../types/camera';
import { MAX_RATING } from '../../const';
import { Link } from 'react-router-dom';

type CameraCardProps = {
  camera: Camera,
  isActive?: boolean,
}

function CameraCard({ camera, isActive }: CameraCardProps): JSX.Element {
  const { id, name, rating, price, reviewCount, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x } = camera;
  return (
    <div className={`product-card ${isActive ? 'is-active' : ''}`}>
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`../${previewImgWebp}, ../${previewImgWebp2x} 2x`} />
          <img src={`../${previewImg}`} srcSet={`../${previewImg2x} 2x`} width="280" height="240" alt={name} />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          {Array.from({ length: MAX_RATING }, ((el, i) => (
            i <= rating ?
              <svg width="17" height="16" aria-hidden="true">
                <use xlinkHref="#icon-full-star" />
              </svg> :
              <svg width="17" height="16" aria-hidden="true">
                <use xlinkHref="#icon-star" />
              </svg>
          ))
          )}
          <p className="visually-hidden">Рейтинг: {rating}</p>
          <p className="rate__count">
            <span className="visually-hidden">Всего оценок:</span>{reviewCount}
          </p>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>{price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button className="btn btn--purple product-card__btn" type="button">Купить</button>
        <Link className="btn btn--transparent" to={`/product/${id}&perks`}>Подробнее</Link>
      </div>
    </div>
  );
}

export default CameraCard;
