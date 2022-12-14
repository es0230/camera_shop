import { NavLink, useParams } from 'react-router-dom';
import { AppRoute, MAX_RATING, TabType } from '../../../const';
import { useAppDispatch } from '../../../hooks';
import { toggleModalOpened } from '../../../store/app-data/app-data';
import { Camera } from '../../../types/camera';

type ProductCardProps = {
  currentProduct: Camera,
}

function ProductCard({ currentProduct }: ProductCardProps): JSX.Element {
  const { name, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, rating, price, vendorCode, type, category, description, level, reviewCount, id } = currentProduct;
  const { tabType } = useParams();
  const dispatch = useAppDispatch();

  const setButtonActive = ({ isActive }: { isActive: boolean }) => isActive ? 'tabs__control is-active' : 'tabs__control';

  const handleAddToBasketClick = () => {
    dispatch(toggleModalOpened());
  };

  return (
    <section data-testid="product-card-component" className="product">
      <div className="container">
        <div className="product__img">
          <picture>
            <source type="image/webp" srcSet={`../../${previewImgWebp}, ../../${previewImgWebp2x} 2x`} />
            <img src={`../../${previewImg}`} srcSet={`../../${previewImg2x} 2x`} width="560" height="480" alt={name} />
          </picture>
        </div>
        <div className="product__content">
          <h1 className="title title--h3">{name}</h1>
          <div className="rate product__rate">
            {Array.from({ length: MAX_RATING }, ((el, i) => (
              i <= rating ?
                <svg width="17" height="16" aria-hidden="true" key={i}>
                  <use xlinkHref="#icon-full-star" />
                </svg> :
                <svg width="17" height="16" aria-hidden="true" key={i}>
                  <use xlinkHref="#icon-star" />
                </svg>
            ))
            )}
            <p className="visually-hidden">Рейтинг: {rating}</p>
            <p className="rate__count">
              <span className="visually-hidden">Всего оценок:</span>{reviewCount}
            </p>
          </div>
          <p className="product__price">
            <span className="visually-hidden">Цена:</span>{price} ₽
          </p>
          <button className="btn btn--purple" type="button" onClick={handleAddToBasketClick}>
            <svg width="24" height="16" aria-hidden="true">
              <use xlinkHref="#icon-add-basket" />
            </svg>Добавить в корзину
          </button>
          <div className="tabs product__tabs">
            <div className="tabs__controls product__tabs-controls">
              <NavLink className={setButtonActive} to={AppRoute.Product(id, TabType.Perks)}>Характеристики</NavLink>
              <NavLink className={setButtonActive} to={AppRoute.Product(id, TabType.Description)}>Описание</NavLink>
            </div>
            <div className="tabs__content">
              <div data-testid="perks-tab" className={`tabs__element ${tabType === TabType.Perks ? 'is-active' : ''}`}>
                <ul className="product__tabs-list">
                  <li className="item-list">
                    <span className="item-list__title">Артикул:</span>
                    <p className="item-list__text"> {vendorCode}</p>
                  </li>
                  <li className="item-list">
                    <span className="item-list__title">Категория:</span>
                    <p className="item-list__text">{category}</p>
                  </li>
                  <li className="item-list">
                    <span className="item-list__title">Тип камеры:</span>
                    <p className="item-list__text">{type}</p>
                  </li>
                  <li className="item-list">
                    <span className="item-list__title">Уровень:</span>
                    <p className="item-list__text">{level}</p>
                  </li>
                </ul>
              </div>
              <div data-testid="description-tab" className={`tabs__element ${tabType === TabType.Description ? 'is-active' : ''}`}>
                <div className="product__tabs-text">
                  {description}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductCard;
