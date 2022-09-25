import { NameSpace } from '../../const';
import { Camera } from '../../types/camera';
import { Promo } from '../../types/promo';
import { State } from '../../types/state';

export const selectCameras = (state: State): Camera[] => state[NameSpace.Data].cameras;

export const selectPromo = (state: State): Promo | null => state[NameSpace.Data].promo;
