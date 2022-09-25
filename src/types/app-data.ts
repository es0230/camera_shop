import { Camera } from './camera';
import { Promo } from './promo';

export type AppData = {
  cameras: Camera[],
  promo: Promo | null,
  isDataLoaded: boolean,
};
