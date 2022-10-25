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
import { AppRoute, INITIAL_PAGE, SortOrder, SortType } from '../../const';
import App from '../../components/app/app';

const mockStore = configureMockStore();

const store = mockStore({
  DATA: {
    cameras: [makeFakeCamera()],
    promo: makeFakePromo(),
    isDataLoaded: false,
    currentProduct: null,
    currentReviews: [],
    currentSimilarProducts: [],
  },
});

const history = createMemoryHistory();

describe('Testing Catalog page', () => {
  it('should render correctly', () => {
    history.push(AppRoute.Catalog(INITIAL_PAGE, SortType.Price, SortOrder.Ascending));

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
    expect(screen.getByTestId('catalog-pagination-component')).toBeInTheDocument();
    expect(screen.getByTestId('footer-component')).toBeInTheDocument();

  });
});
