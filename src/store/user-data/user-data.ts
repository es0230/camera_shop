import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CouponStatus, NameSpace, OrderStatus } from '../../const';
import { Camera } from '../../types/camera';
import { UserData } from '../../types/user-data';
import { postCouponAction, postOrderAction } from '../api-actions';

const initialState: UserData = {
  productList: [],
  basket: {},
  discount: 0,
  couponStatus: CouponStatus.Unknown,
  orderStatus: OrderStatus.Unknown,
};

export const userData = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    addToBasket: (state, action: PayloadAction<Camera>) => {
      if (!state.productList.some((el) => el.id === action.payload.id)) {
        state.productList.push(action.payload);
        state.basket[action.payload.id] = 1;
      } else {
        state.basket[action.payload.id]++;
      }
    },
    removeFromBasket: (state, action: PayloadAction<Camera>) => {
      state.basket[action.payload.id]--;
    },
    removeAllFromBasket: (state, action: PayloadAction<Camera>) => {
      const cameraIndexInProductList = state.productList.findIndex((el) => el.id === action.payload.id);
      state.productList.splice(cameraIndexInProductList, 1);
      delete state.basket[action.payload.id];
    },
    setItemCount: (state, action: PayloadAction<{ camera: Camera, countToMake: number }, string>) => {
      const { camera, countToMake } = action.payload;
      state.basket[camera.id] = countToMake;
    },
    resetOrderStatus: (state) => {
      state.orderStatus = OrderStatus.Unknown;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(postCouponAction.pending, (state) => {
        state.couponStatus = CouponStatus.Unknown;
      })
      .addCase(postCouponAction.rejected, (state) => {
        state.discount = 0;
        state.couponStatus = CouponStatus.Invalid;
      })
      .addCase(postCouponAction.fulfilled, (state, action) => {
        state.discount = action.payload;
        state.couponStatus = CouponStatus.Valid;
      })
      .addCase(postOrderAction.rejected, (state) => {
        state.orderStatus = OrderStatus.Fail;
      })
      .addCase(postOrderAction.fulfilled, (state) => {
        state.orderStatus = OrderStatus.Success;
      });
  }
});

export const { addToBasket, removeFromBasket, removeAllFromBasket, setItemCount, resetOrderStatus } = userData.actions;
