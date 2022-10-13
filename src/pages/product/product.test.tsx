/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeCamera, makeFakePromo, makeFakeReview } from '../../mocks/mocks';
import HistoryRouter from '../../components/history-router/history-router';
import { createMemoryHistory } from 'history';
import { AppRoute, TabType } from '../../const';
import App from '../../components/app/app';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { State } from '../../types/state';
import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const mockCamera = makeFakeCamera();
const mockReview = makeFakeReview();

const store = mockStore({
  DATA: {
    cameras: [mockCamera],
    promo: makeFakePromo(),
    isDataLoaded: false,
    currentProduct: mockCamera,
    currentReviews: [mockReview, mockReview, mockReview, mockReview],
    currentSimilarProducts: [mockCamera, mockCamera, mockCamera, mockCamera],
  },
});

const history = createMemoryHistory();

describe('Testing Product page', () => {
  it('should render correctly', () => {
    history.push(AppRoute.Product(1, TabType.Perks));

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <App />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('header-component')).toBeInTheDocument();
    expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument();
    expect(screen.getByTestId('product-card-component')).toBeInTheDocument();
    expect(screen.getByTestId('similar-products-component')).toBeInTheDocument();
    expect(screen.getByTestId('product-reviews-component')).toBeInTheDocument();
    expect(screen.getByTestId('up-button')).toBeInTheDocument();
    expect(screen.getByTestId('footer-component')).toBeInTheDocument();

  });
});
