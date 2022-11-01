import dayjs from 'dayjs';
import { NameSpace } from '../../const';
import { Camera } from '../../types/camera';
import { Promo } from '../../types/promo';
import { Review } from '../../types/review';
import { State } from '../../types/state';

export const selectCameras = (state: State): Camera[] => state[NameSpace.Data].cameras;

export const selectPromo = (state: State): Promo | null => state[NameSpace.Data].promo;

export const selectCurrentProduct = (state: State): Camera | null => state[NameSpace.Data].currentProduct;

export const selectCurrentReviews = (state: State): Review[] => state[NameSpace.Data].currentReviews.slice().sort((a, b) => (dayjs(a.createAt).isAfter(b.createAt) ? -1 : 1));

export const selectCurrentSimilarProducts = (state: State): Camera[] => state[NameSpace.Data].currentSimilarProducts;

export const selectIsDataLoaded = (state: State): boolean => state[NameSpace.Data].isDataLoaded;

export const selectIsLoadingFailed = (state: State): boolean => state[NameSpace.Data].isLoadingFailed;
