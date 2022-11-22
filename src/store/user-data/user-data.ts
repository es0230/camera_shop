import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { UserData } from '../../types/user-data';

const initialState: UserData = {
  basket: [],
};

export const userData = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.basket.push(action.payload);
    }
  }
});

export const { addToBasket } = userData.actions;
