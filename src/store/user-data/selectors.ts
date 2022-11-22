import { NameSpace } from '../../const';
import { Camera } from '../../types/camera';
import { State } from '../../types/state';

export const selectBasket = (state: State): Camera[] => state[NameSpace.User].basket;
