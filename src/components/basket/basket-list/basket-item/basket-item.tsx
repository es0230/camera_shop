import { useState } from 'react';
import { FilterCategories } from '../../../../const';
import { useAppDispatch } from '../../../../hooks';
import { setCurrentCamera, toggleModalOpened } from '../../../../store/app-data/app-data';
import { addToBasket, removeFromBasket, setItemCount } from '../../../../store/user-data/user-data';
import { Camera } from '../../../../types/camera';

type BasketItemProps = {
  camera: Camera,
  count: number,
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
    <li className="basket-item">
      <div className="basket-item__img">
        <picture>
          <source type="image/webp" srcSet={`../../${previewImgWebp}, ../../${previewImgWebp2x} 2x`} />
          <img src={`../../${previewImg}`} srcSet={`../../${previewImg2x} 2x`} width="140" height="120" alt="Фотоаппарат «Орлёнок»" />
        </picture>
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">{name}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item">
            <span className="basket-item__article">Артикул:</span><span className="basket-item__number">{vendorCode}</span>
          </li>
          <li className="basket-item__list-item">{type} {category === FilterCategories.Photo ? 'фотокамера' : 'видеокамера'}</li>
          <li className="basket-item__list-item">{level} уровень</li>
        </ul>
      </div>
      <p className="basket-item__price">
        <span className="visually-hidden">Цена:</span>{price} ₽
      </p>
      <div className="quantity">
        <button data-testid="decreaseButton" className="btn-icon btn-icon--prev" aria-label="уменьшить количество товара" disabled={currentCount === 1} onClick={handleRemoveItemClick}>
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow" />
          </svg>
        </button>
        <label className="visually-hidden" htmlFor="counter1" />
        <input data-testid="counter" type="number" id="counter1" value={currentCount} min="1" max="99" aria-label="количество товара" onInput={handleItemCountInput} onBlur={handleItemCountBlur} />
        <button data-testid="increaseButton" className="btn-icon btn-icon--next" aria-label="увеличить количество товара" disabled={currentCount === 99} onClick={handleAddItemClick}>
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow" />
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price">
        <span className="visually-hidden">Общая цена:</span>{price * currentCount} ₽
      </div>
      <button data-testid="deleteButton" className="cross-btn" type="button" aria-label="Удалить товар" onClick={handleDeleteItemClick}>
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
      </button>
    </li>
  );
}

export default BasketItem;
