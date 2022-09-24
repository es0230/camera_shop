import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../const';
import { Camera } from '../types/camera';
import { AppDispatch, State } from '../types/state';

export const fetchCamerasAction = createAsyncThunk<Camera[], undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchCameras',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Camera[]>(APIRoute.Cameras);
    return data;
  },
);
