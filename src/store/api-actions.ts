import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../const';
import { Camera } from '../types/camera';
import { Promo } from '../types/promo';
import { Review } from '../types/review';
import { ReviewPost } from '../types/review-post';
import { AppDispatch, State } from '../types/state';
import { URLParams } from '../types/url-params';
import { getExtraQueryURL, getExtraQueryURLForFilters } from '../utils';

export const fetchCamerasByName = createAsyncThunk<Camera[], string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchCamerasByName',
  async (cameraName, { extra: api }) => {
    const { data } = await api.get(`${APIRoute.Cameras}?name_like=${cameraName}`);
    return data;
  }
);

export const fetchInitialData = createAsyncThunk<{ minPrice: string, maxPrice: string, totalCount: string, cameras: Camera[] }, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchInitialData',
  async (_arg, { extra: api }) => {
    const { data } = await api.get(`${APIRoute.Cameras}?_sort=price&_order=asc`);
    const minPrice = data[0].price;
    const maxPrice = data[data.length - 1].price;
    const totalCount = data.length;
    return { minPrice, maxPrice, totalCount, cameras: data };
  }
);


export const fetchCamerasAction = createAsyncThunk<{ minPrice: string, maxPrice: string, data: Camera[], totalCount: string }, URLParams, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchCameras',
  async (params, { extra: api }) => {
    const extraQueryURL = getExtraQueryURL(params);
    const extraQueryURLForFilters = getExtraQueryURLForFilters(params);
    const { data, headers } = await api.get<Camera[]>(`${APIRoute.Cameras}${extraQueryURL}`);
    const validCamerasForFilters = (await api.get<Camera[]>(`${APIRoute.Cameras}${extraQueryURLForFilters}`)).data;
    const prices = validCamerasForFilters.slice().sort((a, b) => a.price - b.price);
    const minPrice = `${prices[0].price}`;
    const maxPrice = `${prices[prices.length - 1].price}`;
    return { data, minPrice, maxPrice, totalCount: headers['x-total-count'] };
  },
);

export const fetchPromoAction = createAsyncThunk<Promo, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchPromo',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Promo>(APIRoute.Promo);
    return data;
  },
);

export const fetchCameraAction = createAsyncThunk<Camera, string | undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchCamera',
  async (id, { extra: api }) => {
    const { data } = await api.get<Camera>(`${APIRoute.Cameras}/${id}`);
    return data;
  },
);

export const fetchReviewsAction = createAsyncThunk<Review[], string | undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchReviews',
  async (id, { extra: api }) => {
    const { data } = await api.get<Review[]>(`${APIRoute.Cameras}/${id}/reviews`);
    return data;
  },
);

export const fetchSimilarProductsAction = createAsyncThunk<Camera[], string | undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchSimilarProductsAction',
  async (id, { extra: api }) => {
    const { data } = await api.get<Camera[]>(`${APIRoute.Cameras}/${id}/similar`);
    return data;
  },
);

export const sendReviewAction = createAsyncThunk<void, ReviewPost, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/sendReviewAction',
  async ({ userName, advantage, disadvantage, review, rating, cameraId }, { extra: api }) => {
    await api.post<Review>(APIRoute.Reviews, { userName, advantage, disadvantage, review, rating, cameraId });
  },
);
