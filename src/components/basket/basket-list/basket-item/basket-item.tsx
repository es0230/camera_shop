import { useState } from 'react';
import { FilterCategories, ProductCategories } from '../../../../const';
import { useAppDispatch } from '../../../../hooks';
import { setCurrentCamera, toggleModalOpened } from '../../../../store/app-data/app-data';
import { addToBasket, removeFromBasket, setItemCount } from '../../../../store/user-data/user-data';
import { Camera } from '../../../../types/camera';

type BasketItemProps = {
  camera: Camera,
  count: number,
}

enum BasketCountLimits {
  Lower = 1,
  Upper = 99,
}

function BasketItem({ camera, count }: BasketItemProps): JSX.Element {
  const { name, vendorCode, type, category, level, price, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x } = camera;
  const [currentCount, setCurrentCount] = useState(count);

  const dispatch = useAppDispatch();

  const handleRemoveItemClick = () => {
    setCurrentCount(currentCount - 1);
    dispatch(removeFromBasket(camera));
  };

  const handleAddItemClick = () => {
    setCurrentCount(currentCount + 1);
    dispatch(addToBasket(camera));
  };

  const handleDeleteItemClick = () => {
    dispatch(setCurrentCamera(camera));
    dispatch(toggleModalOpened());
  };

  const handleItemCountInput = (evt: React.FormEvent<HTMLInputElement>) => {
    const newCount = evt.currentTarget.value;
    if (+newCount >= 1 || +newCount <= 99) {
      setCurrentCount(+newCount);
    }
  };

  const handleItemCountBlur = () => {
    if (currentCount < 1) {
      setCurrentCount(1);
    }
    if (currentCount > 99) {
      setCurrentCount(99);
    }
    dispatch(setItemCount({ camera, countToMake: currentCount }));
  };

  return (
    <li data-testid="basketItem" className="basket-item">
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
            <span className="basket-item__article">??????????????:</span><span className="basket-item__number">{vendorCode}</span>
          </li>
          <li className="basket-item__list-item">{type} {category === FilterCategories.Photo ? ProductCategories.Photo : ProductCategories.Video}</li>
          <li className="basket-item__list-item">{level} ??????????????</li>
        </ul>
      </div>
      <p className="basket-item__price">
        <span className="visually-hidden">????????:</span>{price} ???
      </p>
      <div className="quantity">
        <button data-testid="decreaseButton" className="btn-icon btn-icon--prev" aria-label="?????????????????? ???????????????????? ????????????" disabled={currentCount === BasketCountLimits.Lower} onClick={handleRemoveItemClick}>
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow" />
          </svg>
        </button>
        <label className="visually-hidden" htmlFor="counter1" />
        <input data-testid="counter" type="number" id="counter1" value={currentCount} min="1" max="99" aria-label="???????????????????? ????????????" onInput={handleItemCountInput} onBlur={handleItemCountBlur} />
        <button data-testid="increaseButton" className="btn-icon btn-icon--next" aria-label="?????????????????? ???????????????????? ????????????" disabled={currentCount === BasketCountLimits.Upper} onClick={handleAddItemClick}>
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow" />
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price">
        <span className="visually-hidden">?????????? ????????:</span>{price * currentCount} ???
      </div>
      <button data-testid="deleteButton" className="cross-btn" type="button" aria-label="?????????????? ??????????" onClick={handleDeleteItemClick}>
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
      </button>
    </li>
  );
}

export default BasketItem;
