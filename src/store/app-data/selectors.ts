import { NameSpace } from '../../const';
import { Camera } from '../../types/camera';
import { State } from '../../types/state';

export const selectCameras = (state: State): Camera[] => state[NameSpace.Data].cameras;
