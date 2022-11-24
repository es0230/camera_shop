import { useAppSelector } from '../../../hooks';
import { selectBasket } from '../../../store/user-data/selectors';
import { Camera } from '../../../types/camera';
import BasketItem from './basket-item/basket-item';


type BasketListProps = {
  cameras: Camera[],
}

function BasketList({ cameras }: BasketListProps): JSX.Element {
  const basket = useAppSelector(selectBasket);

  if (cameras.length === 0) {
    return (<div data-testid="basketList" style={{ textAlign: 'center', fontSize: '42px', marginBottom: '70px' }} >Корзина пока что пуста ;(</div>);
  }

  return (
    <ul data-testid="basketList" className="basket__list">
      {cameras.map((el) => <BasketItem camera={el} key={el.id} count={basket[el.id]} />)}
    </ul>
  );
}

export default BasketList;
