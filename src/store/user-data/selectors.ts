import { CouponStatus, NameSpace, OrderStatus } from '../../const';
import { Camera } from '../../types/camera';
import { State } from '../../types/state';

export const selectTotalPrice = (state: State): number => state[NameSpace.User].productList.map((el) => el.price * state[NameSpace.User].basket[el.id]).reduce((a, b) => a + b, 0);

export const selectCamerasInBasket = (state: State): Camera[] => state[NameSpace.User].productList;

export const selectBasketSize = (state: State): number => Object.values(state[NameSpace.User].basket).reduce((a, b) => a + b, 0);

export const selectBasket = (state: State): { [id: number]: number } => state[NameSpace.User].basket;

export const selectDiscount = (state: State): number => state[NameSpace.User].discount;

export const selectCouponStatus = (state: State): CouponStatus => state[NameSpace.User].couponStatus;

export const selectBasketProductIds = (state: State): number[] => state[NameSpace.User].productList.map((el) => Array.from({ length: state[NameSpace.User].basket[el.id] }, () => el.id)).join(',').split(',').map((el) => +el);

export const selectOrderStatus = (state: State): OrderStatus => state[NameSpace.User].orderStatus;
