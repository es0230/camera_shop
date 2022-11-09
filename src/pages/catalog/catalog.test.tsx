/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeCamera, makeFakePromo } from '../../mocks/mocks';
import HistoryRouter from '../../components/history-router/history-router';
import { createMemoryHistory } from 'history';
import { AppRoute, INITIAL_CATALOG_PAGE_URL_PARAMS, SortOrder, SortType } from '../../const';
import App from '../../components/app/app';
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

const fakeCamera1 = { ...makeFakeCamera(), price: 100, category: 'Фотоаппарат', type: 'Плёночная', level: 'Нулевой' };
const fakeCamera2 = { ...makeFakeCamera(), price: 300, category: 'Фотоаппарат', type: 'Цифровая', level: 'Профессиональный' };
const fakeCamera3 = { ...makeFakeCamera(), price: 500, category: 'Видеокамера', type: 'Коллекционная', level: 'Любительский' };
const fakeCamera4 = { ...makeFakeCamera(), price: 900, category: 'Фотоаппарат', type: 'Моментальная', level: 'Нулевой' };

const store = mockStore({
  DATA: {
    cameras: [fakeCamera1, fakeCamera2, fakeCamera3, fakeCamera4],
    minPrice: '100',
    maxPrice: '900',
    prices: ['100', '300', '500', '900'],
    totalCount: '4',
    promo: makeFakePromo(),
    isDataLoaded: false,
    currentProduct: null,
    currentReviews: [],
    currentSimilarProducts: [],
  },
  FILTERS: {
    filters: {
      price: {
        minPrice: '100',
        maxPrice: '900',
      },
      category: {
        'Фотоаппарат': false,
        'Видеокамера': false,
      },
      type: {
        'Цифровая': false,
        'Плёночная': false,
        'Моментальная': false,
        'Коллекционная': false,
      },
      level: {
        'Нулевой': false,
        'Любительский': false,
        'Профессиональный': false,
      }
    },
    sort: {
      type: SortType.Price,
      order: SortOrder.Ascending,
    },
    page: '1',
  },
});

const history = createMemoryHistory();

describe('Testing Catalog page', () => {
  it('should render correctly', () => {
    history.push(AppRoute.Catalog(INITIAL_CATALOG_PAGE_URL_PARAMS));

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <App />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('header-component')).toBeInTheDocument();
    expect(screen.getByTestId('ad-component')).toBeInTheDocument();
    expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument();
    expect(screen.getByText(/Каталог фото- и видеотехники/)).toBeInTheDocument();
    expect(screen.getByTestId('catalog-filter-component')).toBeInTheDocument();
    expect(screen.getByTestId('catalog-sort-component')).toBeInTheDocument();
    expect(screen.getByTestId('catalog-gallery-component')).toBeInTheDocument();
    expect(screen.getAllByTestId('camera-card').length).toBe(4);
    expect(screen.getByTestId('catalog-pagination-component')).toBeInTheDocument();
    expect(screen.getByTestId('footer-component')).toBeInTheDocument();
  });
});
