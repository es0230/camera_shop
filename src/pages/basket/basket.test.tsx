/**
 * @jest-environment jsdom
 */

import { configureMockStore } from '@jedmao/redux-mock-store';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import App from '../../components/app/app';
import HistoryRouter from '../../components/history-router/history-router';
import { AppRoute, CouponStatus, FilterCategories, OrderStatus } from '../../const';
import { makeFakeCamera } from '../../mocks/mocks';
import { Camera } from '../../types/camera';

const mockCamera1 = { ...makeFakeCamera(), category: FilterCategories.Photo } as Camera;
const mockCamera2 = { ...makeFakeCamera(), category: FilterCategories.Photo } as Camera;

const mockStore = configureMockStore();

const store = mockStore({
  USER: {
    productList: [mockCamera1, mockCamera2],
    basket: {
      [mockCamera1.id]: 1,
      [mockCamera2.id]: 2,
    },
    discount: 0,
    couponStatus: CouponStatus.Unknown,
    orderStatus: OrderStatus.Unknown,
  },
  DATA: {
    searchedCameras: [],
  }
});

const history = createMemoryHistory();

describe('Testing Basket page', () => {
  it('should render correctly', () => {
    history.push(AppRoute.Basket());

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <App />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('basket')).toBeInTheDocument();
  });
});
