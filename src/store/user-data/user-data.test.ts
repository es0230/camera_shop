import { CouponStatus, OrderStatus } from '../../const';
import { makeFakeCamera } from '../../mocks/mocks';
import { UserData } from '../../types/user-data';
import { postCouponAction, postOrderAction } from '../api-actions';
import { addToBasket, removeAllFromBasket, removeFromBasket, resetOrderStatus, setItemCount, userData } from './user-data';

const initialState: UserData = {
  productList: [],
  basket: {},
  discount: 0,
  couponStatus: CouponStatus.Unknown,
  orderStatus: OrderStatus.Unknown,
};

const mockCamera1 = makeFakeCamera();

describe('Testing userData', () => {
  let state: UserData;

  beforeEach(() => {
    state = initialState;
  });

  describe('testing addToBasket action', () => {
    it('without similar items in productList', () => {
      expect(userData.reducer(state, {
        type: addToBasket.type, payload: mockCamera1
      })).toEqual({
        ...state,
        productList: [mockCamera1],
        basket: { [mockCamera1.id]: 1 }
      });
    });

    it('with similar items in productList', () => {
      state = {
        ...initialState,
        productList: [mockCamera1],
        basket: { [mockCamera1.id]: 1 }
      };

      expect(userData.reducer(state, {
        type: addToBasket.type, payload: mockCamera1
      })).toEqual({
        ...state,
        basket: { [mockCamera1.id]: 2 }
      });
    });
  });

  it('testing removeFromBasket action', () => {
    state = {
      ...initialState,
      productList: [mockCamera1],
      basket: { [mockCamera1.id]: 2 }
    };

    expect(userData.reducer(state, {
      type: removeFromBasket.type, payload: mockCamera1
    })).toEqual({
      ...state,
      basket: { [mockCamera1.id]: 1 }
    });
  });

  it('testing removeAllFromBasket action', () => {
    state = {
      ...initialState,
      productList: [mockCamera1],
      basket: { [mockCamera1.id]: 2 }
    };

    expect(userData.reducer(state, {
      type: removeAllFromBasket.type, payload: mockCamera1
    })).toEqual({
      ...state,
      productList: [],
      basket: {}
    });
  });

  it('testing setItemCount action', () => {
    state = {
      ...initialState,
      productList: [mockCamera1],
      basket: { [mockCamera1.id]: 2 }
    };

    expect(userData.reducer(state, {
      type: setItemCount.type, payload: { camera: mockCamera1, countToMake: 10 }
    })).toEqual({
      ...state,
      productList: [mockCamera1],
      basket: { [mockCamera1.id]: 10 }
    });
  });

  it('testing resetOrderStatus action', () => {
    state = {
      ...initialState,
      orderStatus: OrderStatus.Success
    };

    expect(userData.reducer(state, {
      type: resetOrderStatus.type
    })).toEqual({
      ...state,
      orderStatus: OrderStatus.Unknown,
    });
  });

  describe('testing postCouponAction', () => {
    it('should keep couponStatus = unknown on "pending"', () => {
      expect(userData.reducer(state, {
        type: postCouponAction.pending.type
      })).toEqual({
        ...state,
        couponStatus: CouponStatus.Unknown,
      });
    });

    it('should make discount = 0 and couponStatus = invalid on "rejected"', () => {
      expect(userData.reducer(state, {
        type: postCouponAction.rejected.type
      })).toEqual({
        ...state,
        discount: 0,
        couponStatus: CouponStatus.Invalid,
      });
    });

    it('should pass received data to state and change couponStatus = valid on "fulfilled"', () => {
      expect(userData.reducer(state, {
        type: postCouponAction.fulfilled.type, payload: 10
      })).toEqual({
        ...state,
        discount: 10,
        couponStatus: CouponStatus.Valid,
      });
    });
  });

  describe('testing postOrderAction', () => {
    it('should make orderStatus = fail on "rejected"', () => {
      expect(userData.reducer(state, {
        type: postOrderAction.rejected.type
      })).toEqual({
        ...state,
        orderStatus: OrderStatus.Fail,
      });
    });

    it('should pass received data to state and change couponStatus = valid on "fulfilled"', () => {
      expect(userData.reducer(state, {
        type: postOrderAction.fulfilled.type,
      })).toEqual({
        ...state,
        orderStatus: OrderStatus.Success,
      });
    });
  });
});
