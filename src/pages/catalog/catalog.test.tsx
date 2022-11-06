/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeCamera, makeFakePromo } from '../../mocks/mocks';
import HistoryRouter from '../../components/history-router/history-router';
import { createMemoryHistory } from 'history';
import { AppRoute, INITIAL_CATALOG_PAGE_URL_PARAMS } from '../../const';
import App from '../../components/app/app';

const mockStore = configureMockStore();

const fakeCamera1 = { ...makeFakeCamera(), price: 100, category: 'Фотоаппарат', type: 'Плёночная', level: 'Нулевой' };
const fakeCamera2 = { ...makeFakeCamera(), price: 300, category: 'Фотоаппарат', type: 'Цифровая', level: 'Профессиональный' };
const fakeCamera3 = { ...makeFakeCamera(), price: 500, category: 'Видеокамера', type: 'Коллекционная', level: 'Любительский' };
const fakeCamera4 = { ...makeFakeCamera(), price: 900, category: 'Фотоаппарат', type: 'Моментальная', level: 'Нулевой' };

const store = mockStore({
  DATA: {
    cameras: [fakeCamera1, fakeCamera2, fakeCamera3, fakeCamera4],
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

  describe('testing interactions with filter component', () => {
    it('should rerender correctly on price change', async () => {
      history.push(AppRoute.Catalog(INITIAL_CATALOG_PAGE_URL_PARAMS));

      render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <App />
          </HistoryRouter>
        </Provider>
      );

      const minPriceInput = screen.getByTestId('minPriceInput');
      const maxPriceInput = screen.getByTestId('maxPriceInput');

      await userEvent.click(minPriceInput);
      await userEvent.type(minPriceInput, '300');
      await userEvent.click(maxPriceInput);

      expect(screen.getAllByTestId('camera-card').length).toBe(3);

      await userEvent.type(maxPriceInput, '500');
      await userEvent.click(minPriceInput);

      expect(screen.getAllByTestId('camera-card').length).toBe(2);
    });

    it('should rerender correctly on category change', async () => {
      history.push(AppRoute.Catalog(INITIAL_CATALOG_PAGE_URL_PARAMS));

      render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <App />
          </HistoryRouter>
        </Provider>
      );

      const photoCategoryInput = screen.getByTestId('photoCategory');
      const videoCategoryInput = screen.getByTestId('videoCategory');

      await userEvent.click(photoCategoryInput);

      expect(screen.getAllByTestId('camera-card').length).toBe(3);

      await userEvent.click(videoCategoryInput);

      expect(screen.getAllByTestId('camera-card').length).toBe(4);

      await userEvent.click(photoCategoryInput);

      expect(screen.getAllByTestId('camera-card').length).toBe(1);

      await userEvent.click(videoCategoryInput);

      expect(screen.getAllByTestId('camera-card').length).toBe(4);
    });

    it('should rerender correctly on product type change', async () => {
      history.push(AppRoute.Catalog(INITIAL_CATALOG_PAGE_URL_PARAMS));

      render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <App />
          </HistoryRouter>
        </Provider>
      );

      const digitalTypeInput = screen.getByTestId('digitalType');
      const filmTypeInput = screen.getByTestId('filmType');
      const snapshotTypeInput = screen.getByTestId('snapshotType');
      const collectionType = screen.getByTestId('collectionType');

      await userEvent.click(digitalTypeInput);

      expect(screen.getAllByTestId('camera-card').length).toBe(1);

      await userEvent.click(filmTypeInput);

      expect(screen.getAllByTestId('camera-card').length).toBe(2);

      await userEvent.click(snapshotTypeInput);

      expect(screen.getAllByTestId('camera-card').length).toBe(3);

      await userEvent.click(collectionType);

      expect(screen.getAllByTestId('camera-card').length).toBe(4);

      await userEvent.click(digitalTypeInput);

      expect(screen.getAllByTestId('camera-card').length).toBe(3);

      await userEvent.click(filmTypeInput);

      expect(screen.getAllByTestId('camera-card').length).toBe(2);

      await userEvent.click(snapshotTypeInput);

      expect(screen.getAllByTestId('camera-card').length).toBe(1);

      await userEvent.click(collectionType);

      expect(screen.getAllByTestId('camera-card').length).toBe(4);
    });

    it('should rerender correctly on level change', async () => {
      history.push(AppRoute.Catalog(INITIAL_CATALOG_PAGE_URL_PARAMS));

      render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <App />
          </HistoryRouter>
        </Provider>
      );

      const zeroLevelInput = screen.getByTestId('zeroLevel');
      const amateurLevelInput = screen.getByTestId('amateurLevel');
      const professionalLevelInput = screen.getByTestId('professionalLevel');

      await userEvent.click(zeroLevelInput);

      expect(screen.getAllByTestId('camera-card').length).toBe(2);

      await userEvent.click(amateurLevelInput);

      expect(screen.getAllByTestId('camera-card').length).toBe(3);

      await userEvent.click(professionalLevelInput);

      expect(screen.getAllByTestId('camera-card').length).toBe(4);

      await userEvent.click(zeroLevelInput);

      expect(screen.getAllByTestId('camera-card').length).toBe(2);

      await userEvent.click(amateurLevelInput);

      expect(screen.getAllByTestId('camera-card').length).toBe(1);

      await userEvent.click(professionalLevelInput);

      expect(screen.getAllByTestId('camera-card').length).toBe(4);
    });
  });
});
