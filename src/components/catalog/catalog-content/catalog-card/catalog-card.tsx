import { Camera } from '../../../../types/camera';
import StarIcon from './star-icon/star-icon';

type CatalogCardProps = {
  camera: Camera
}

function CatalogCard({ camera }: CatalogCardProps): JSX.Element {
  const { name, rating, price, reviewCount, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x } = camera;
  return (
    <div className="product-card">
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`../${previewImgWebp}, ../${previewImgWebp2x} 2x`} />
          <img src={`../${previewImg}`} srcSet={`../${previewImg2x} 2x`} width="280" height="240" alt={name} />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          {Array.from({ length: rating }, ((el, i) => (
            <StarIcon key={i} />
          ))
          ).map((el) => el)}
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
        <a className="btn btn--transparent" href="#">Подробнее</a>
      </div>
    </div>
  );
}

export default CatalogCard;
