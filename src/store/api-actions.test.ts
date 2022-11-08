import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { State } from '../types/state';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { APIRoute, INITIAL_CATALOG_PAGE_URL_PARAMS } from '../const';
import { fetchCameraAction, fetchCamerasAction, fetchPromoAction, fetchReviewsAction, fetchSimilarProductsAction, sendReviewAction } from './api-actions';
import { makeFakeCamera, makeFakePromo, makeFakeReview, makeFakeReviewPost } from '../mocks/mocks';
import { datatype } from 'faker';
import { Review } from '../types/review';

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

      await store.dispatch(fetchCamerasAction(INITIAL_CATALOG_PAGE_URL_PARAMS));

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

  describe('Testing fetchCameraAction', () => {
    it('should trigger .pending and .fulfilled types of fetchCameraAction when server returns 200', async () => {
      const store = mockStore();
      const mockCameraResponse = makeFakeCamera();

      mockAPI
        .onGet(`${APIRoute.Cameras}/${mockCameraResponse.id}`)
        .reply(200, mockCameraResponse);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchCameraAction(String(mockCameraResponse.id)));

      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toEqual([
        fetchCameraAction.pending.type,
        fetchCameraAction.fulfilled.type
      ]);
    });
  });

  describe('Testing fetchReviewsAction', () => {
    it('should trigger .pending and .fulfilled types of fetchReviewsAction when server returns 200', async () => {
      const store = mockStore();
      const mockCamera = makeFakeCamera();
      const mockReviewsResponse = Array.from({ length: 10 }, () => makeFakeReview());

      mockAPI
        .onGet(`${APIRoute.Cameras}/${mockCamera.id}/reviews`)
        .reply(200, mockReviewsResponse);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchReviewsAction(String(mockCamera.id)));

      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.fulfilled.type
      ]);
    });

    describe('Testing fetchSimilarProductsAction', () => {
      it('should trigger .pending and .fulfilled types of fetchReviewsAction when server returns 200', async () => {
        const store = mockStore();
        const mockCamera = makeFakeCamera();
        const mockCamerasResponse = Array.from({ length: 10 }, () => makeFakeCamera());

        mockAPI
          .onGet(`${APIRoute.Cameras}/${mockCamera.id}/similar`)
          .reply(200, mockCamerasResponse);

        expect(store.getActions()).toEqual([]);

        await store.dispatch(fetchSimilarProductsAction(String(mockCamera.id)));

        const actions = store.getActions().map(({ type }) => type);

        expect(actions).toEqual([
          fetchSimilarProductsAction.pending.type,
          fetchSimilarProductsAction.fulfilled.type
        ]);
      });
    });

    describe('Testing sendReviewAction', () => {
      it('should trigger .pending and .fulfilled types of fetchReviewsAction when server returns 200', async () => {
        const store = mockStore();
        const mockReviewPost = makeFakeReviewPost();
        const mockReviewResponse: Review = { ...mockReviewPost, createAt: String(datatype.datetime()), id: String(datatype.number()) };

        mockAPI
          .onPost(APIRoute.Reviews, mockReviewPost)
          .reply(200, mockReviewResponse);

        expect(store.getActions()).toEqual([]);

        await store.dispatch(sendReviewAction(mockReviewPost));

        const actions = store.getActions().map(({ type }) => type);

        expect(actions).toEqual([
          sendReviewAction.pending.type,
          sendReviewAction.fulfilled.type
        ]);
      });
    });
  });
});
