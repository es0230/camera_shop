import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, DEFAULT_FILTER_VALUE, FilterCategories, FilterLevels, FilterTypes } from '../const';
import { Camera } from '../types/camera';
import { Promo } from '../types/promo';
import { Review } from '../types/review';
import { ReviewPost } from '../types/review-post';
import { AppDispatch, State } from '../types/state';
import { URLParams } from '../types/url-params';

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

export const fetchCamerasAction = createAsyncThunk<{ data: Camera[], totalCount: string }, URLParams, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchCameras',
  async (params, { extra: api }) => {
    const { page, sortType, order, category, productType, level, minPrice, maxPrice } = params;
    const categoryURLPart = category === FilterCategories.Any ? '' : category.split(',').map((el) => `&category=${el}`).join('');
    const productTypeURLPart = productType === FilterTypes.Any ? '' : productType.split(',').map((el) => `&type=${el}`).join('');
    const levelURLPart = level === FilterLevels.Any ? '' : level.split(',').map((el) => `&level=${el}`).join('');
    const priceURLPart = `${minPrice !== DEFAULT_FILTER_VALUE ? `&price_gte=${minPrice}` : ''}${maxPrice !== DEFAULT_FILTER_VALUE ? `&price_lte=${maxPrice}` : ''}`;
    const extraQueryURL = `?_start=${(+page - 1) * 9}&_end=${+page * 9}&_sort=${sortType}&_order=${order}${categoryURLPart}${productTypeURLPart}${levelURLPart}${priceURLPart}`;
    const { data, headers } = await api.get<Camera[]>(`${APIRoute.Cameras}${extraQueryURL}`);
    return { data, totalCount: headers['x-total-count'] };
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
