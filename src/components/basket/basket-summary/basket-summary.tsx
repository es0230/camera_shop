import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute, CouponStatus, OrderStatus } from '../../../const';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { postCouponAction, postOrderAction } from '../../../store/api-actions';
import { selectBasketProductIds, selectCouponStatus, selectDiscount, selectOrderStatus } from '../../../store/user-data/selectors';

type BasketSummaryProps = {
  totalPrice: number,
}

const getCouponInputClass = (status: CouponStatus) => {
  switch (status) {
    case CouponStatus.Unknown:
      return '';
    case CouponStatus.Valid:
      return 'is-valid';
    case CouponStatus.Invalid:
      return 'is-invalid';
  }
};

function BasketSummary({ totalPrice }: BasketSummaryProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState('');
  const [sendCoupon, setSendCoupon] = useState(false);
  const [sendOrder, setSendOrder] = useState(false);
  const discount = useAppSelector(selectDiscount);
  const couponStatus = useAppSelector(selectCouponStatus);
  const orderStatus = useAppSelector(selectOrderStatus);
  const basketContents = useAppSelector(selectBasketProductIds);

  const validateCoupon = (couponToValidate: string) => couponToValidate.split(' ').length === 1;

  const handleCouponInput = (evt: React.FormEvent<HTMLInputElement>) => {
    const currentCoupon = evt.currentTarget.value;
    if (!validateCoupon(currentCoupon)) {
      setCoupon(currentCoupon.split(' ').join(''));
    } else {
      setCoupon(currentCoupon);
    }
  };

  const handleCouponPost = () => {
    setSendCoupon(true);
  };

  const handleOrderPost = () => {
    setSendOrder(true);
  };

  useEffect(() => {
    if (sendCoupon) {
      dispatch(postCouponAction({ coupon }));
      setSendCoupon(false);
    }
  }, [coupon, dispatch, sendCoupon]);

  useEffect(() => {
    if (sendOrder) {
      const couponToSend = couponStatus === CouponStatus.Valid ? coupon as 'camera-333' | 'camera-444' | 'camera-555' : null;
      const order = { camerasIds: basketContents, coupon: couponToSend };
      dispatch(postOrderAction(order));
      setSendOrder(false);
    }
  }, [basketContents, coupon, couponStatus, dispatch, sendOrder]);

  useEffect(() => {
    if (orderStatus === OrderStatus.Fail) {
      navigate(AppRoute.Unknown());
    }
  }, [navigate, orderStatus]);

  return (
    <div className="basket__summary">
      <div className="basket__promo">
        <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
        <div className="basket-form">
          <form action="#">
            <div className={`custom-input ${getCouponInputClass(couponStatus)}`}>
              <label>
                <span className="custom-input__label">Промокод</span>
                <input type="text" name="promo" placeholder="Введите промокод" value={coupon} onInput={handleCouponInput} />
              </label>
              <p className="custom-input__error">Промокод неверный</p>
              <p className="custom-input__success">Промокод принят!</p>
            </div>
            <button className="btn" type="button" onClick={handleCouponPost}>Применить
            </button>
          </form>
        </div>
      </div>
      <div className="basket__summary-order">
        <p className="basket__summary-item"><span className="basket__summary-text">Всего:</span><span className="basket__summary-value">{totalPrice} ₽</span></p>
        <p className="basket__summary-item"><span className="basket__summary-text">Скидка:</span><span className={`basket__summary-value ${discount === 0 ? '' : 'basket__summary-value--bonus'}`}>{totalPrice * discount / 100} ₽</span></p>
        <p className="basket__summary-item"><span className="basket__summary-text basket__summary-text--total">К оплате:</span><span className="basket__summary-value basket__summary-value--total">{totalPrice * (100 - discount) / 100} ₽</span></p>
        <button className="btn btn--purple" onClick={handleOrderPost}>Оформить заказ
        </button>
      </div>
    </div>
  );
}

export default BasketSummary;
