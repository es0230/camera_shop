import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Camera } from '../../types/camera';
import { UserData } from '../../types/user-data';

const initialState: UserData = {
  productList: [],
  basket: {},
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
    }
  }
});

export const { addToBasket, removeFromBasket, removeAllFromBasket, setItemCount } = userData.actions;
