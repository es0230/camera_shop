import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { State } from '../types/state';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { APIRoute } from '../const';
import { fetchCamerasAction, fetchPromoAction } from './api-actions';
import { makeFakeCamera, makeFakePromo } from '../mocks/mocks';

describe('Testing async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  describe('Testing fetchCamerasAction', () => {
    it('should trigger .pending and .fulfilled types of fetchCamerasAction when server returns 200', async () => {
      const store = mockStore();
      const mockCamerasResponse = Array.from({ length: 10 }, () => makeFakeCamera());

      mockAPI
        .onGet(APIRoute.Cameras)
        .reply(200, mockCamerasResponse);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchCamerasAction());

      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toEqual([
        fetchCamerasAction.pending.type,
        fetchCamerasAction.fulfilled.type
      ]);
    });
  });

  describe('Testing fetchPromoAction', () => {
    it('should trigger .pending and .fulfilled types of fetchPromoAction when server returns 200', async () => {
      const store = mockStore();
      const mockPromoResponse = makeFakePromo();

      mockAPI
        .onGet(APIRoute.Promo)
        .reply(200, mockPromoResponse);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchPromoAction());

      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toEqual([
        fetchPromoAction.pending.type,
        fetchPromoAction.fulfilled.type
      ]);
    });
  });

});
