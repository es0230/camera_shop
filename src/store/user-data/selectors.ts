import { NameSpace } from '../../const';
import { Camera } from '../../types/camera';
import { State } from '../../types/state';

export const selectTotalPrice = (state: State): number => state[NameSpace.User].productList.map((el) => el.price * state[NameSpace.User].basket[el.id]).reduce((a, b) => a + b, 0);

export const selectCamerasInBasket = (state: State): Camera[] => state[NameSpace.User].productList;

export const selectBasketSize = (state: State): number => Object.values(state[NameSpace.User].basket).reduce((a, b) => a + b, 0);

export const selectBasket = (state: State): { [id: number]: number } => state[NameSpace.User].basket;
