/**
 * @jest-environment jsdom
 */

import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AppRoute, TabType } from '../../const';
import { makeFakeCamera, makeFakePromo, makeFakeReview } from '../../mocks/mocks';
import HistoryRouter from '../history-router/history-router';
import '@testing-library/jest-dom';
import App from './app';
import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';
import { State } from '../../types/state';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const store = mockStore({
  DATA: {
    cameras: [makeFakeCamera()],
    promo: makeFakePromo(),
    isDataLoaded: false,
    currentProduct: makeFakeCamera(),
    currentReviews: [makeFakeReview()],
    currentSimilarProducts: [makeFakeCamera()],
  },
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Testing App component', () => {
  it('should render Catalog when user navigate to "/catalog/1"', () => {
    history.push(AppRoute.Catalog(1));

    render(fakeApp);

    expect(history.location.pathname).toBe(AppRoute.Catalog(1));

    expect(screen.getByTestId('catalog-page')).toBeInTheDocument();
  });

  it('should render Product when user navigate to "/product/1"', () => {
    history.push(AppRoute.Product(1, TabType.Perks));

    render(fakeApp);

    expect(history.location.pathname).toBe(AppRoute.Product(1, TabType.Perks));

    expect(screen.getByTestId('product-page')).toBeInTheDocument();
  });


  it('should render PageNotFound when user navigate to "/*"', () => {
    history.push(AppRoute.Unknown());

    render(fakeApp);

    expect(history.location.pathname).toBe(AppRoute.Unknown());

    expect(screen.getByTestId('page-not-found')).toBeInTheDocument();
  });
});
