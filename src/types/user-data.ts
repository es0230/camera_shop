import { CouponStatus, OrderStatus } from '../const';
import { Camera } from './camera';

export type UserData = {
  productList: Camera[],
  basket: { [id: number]: number },
  discount: number,
  couponStatus: CouponStatus,
  orderStatus: OrderStatus,
}
