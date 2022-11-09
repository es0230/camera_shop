/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CatalogFilter from './catalog-filter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { SortType, SortOrder } from '../../../const';
import { Provider } from 'react-redux';

const mockStore = configureMockStore();

const store = mockStore({
  DATA: {
    prices: ['500', '1000']
  },
  FILTERS: {
    filters: {
      price: {
        minPrice: '500',
        maxPrice: '1000',
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

describe('Testing CatalogFilter component', () => {
  const minPrice = '500';
  const maxPrice = '1000';

  it('should render correctly', () => {
    render(
      <Provider store={store} >
        <BrowserRouter>
          <CatalogFilter minPrice={minPrice} maxPrice={maxPrice} onClearFiltersButtonClick={jest.fn()} />
        </BrowserRouter>
      </Provider>
    );

    const minPriceInput = screen.getByTestId('minPriceInput');
    const maxPriceInput = screen.getByTestId('maxPriceInput');

    expect(screen.getByText(/Цена, ₽/)).toBeInTheDocument();
    expect(minPriceInput).toBeInTheDocument();
    expect(maxPriceInput).toBeInTheDocument();
    expect(screen.getByText(/Категория/)).toBeInTheDocument();
    expect(screen.getByText(/Фотокамера/)).toBeInTheDocument();
    expect(screen.getByText(/Видеокамера/)).toBeInTheDocument();
    expect(screen.getByText(/Тип камеры/)).toBeInTheDocument();
    expect(screen.getByText(/Цифровая/)).toBeInTheDocument();
    expect(screen.getByText(/Плёночная/)).toBeInTheDocument();
    expect(screen.getByText(/Моментальная/)).toBeInTheDocument();
    expect(screen.getByText(/Коллекционная/)).toBeInTheDocument();
    expect(screen.getByText(/Уровень/)).toBeInTheDocument();
    expect(screen.getByText(/Нулевой/)).toBeInTheDocument();
    expect(screen.getByText(/Любительский/)).toBeInTheDocument();
    expect(screen.getByText(/Профессиональный/)).toBeInTheDocument();
    expect(screen.getByText(/Сбросить фильтры/)).toBeInTheDocument();
  });

  describe('should treat price change correctly', () => {
    const lessThanMinimalPrice = +minPrice - 1;
    const moreThanMaximalPrice = +maxPrice + 1;

    it('should change lessThanMinimalPrice to minPrice', async () => {
      render(
        <Provider store={store} >
          <BrowserRouter>
            <CatalogFilter minPrice={minPrice} maxPrice={maxPrice} onClearFiltersButtonClick={jest.fn()} />
          </BrowserRouter>
        </Provider>
      );

      const minPriceInput = screen.getByTestId('minPriceInput');
      const maxPriceInput = screen.getByTestId('maxPriceInput');

      await userEvent.click(minPriceInput);
      await userEvent.type(minPriceInput, String(lessThanMinimalPrice));
      await userEvent.click(maxPriceInput);

      expect(screen.getByDisplayValue(minPrice)).toBeInTheDocument();
    });

    it('should change moreThanMaximalPrice to maxPrice', async () => {
      render(
        <Provider store={store} >
          <BrowserRouter>
            <CatalogFilter minPrice={minPrice} maxPrice={maxPrice} onClearFiltersButtonClick={jest.fn()} />
          </BrowserRouter>
        </Provider>
      );

      const minPriceInput = screen.getByTestId('minPriceInput');
      const maxPriceInput = screen.getByTestId('maxPriceInput');

      await userEvent.click(maxPriceInput);
      await userEvent.type(maxPriceInput, String(moreThanMaximalPrice));
      await userEvent.click(minPriceInput);

      expect(screen.getByDisplayValue(maxPrice)).toBeInTheDocument();
    });

    it('should change value in minPriceInput to a value in maxPriceInput in the first one is greater', async () => {
      render(
        <Provider store={store} >
          <BrowserRouter>
            <CatalogFilter minPrice={minPrice} maxPrice={maxPrice} onClearFiltersButtonClick={jest.fn()} />
          </BrowserRouter>
        </Provider>
      );

      const minPriceInput = screen.getByTestId('minPriceInput');
      const maxPriceInput = screen.getByTestId('maxPriceInput');

      await userEvent.click(maxPriceInput);
      await userEvent.type(maxPriceInput, String(maxPrice));
      await userEvent.click(minPriceInput);
      await userEvent.type(minPriceInput, String(moreThanMaximalPrice));
      await userEvent.click(maxPriceInput);

      expect(screen.getAllByDisplayValue(maxPrice).length).toBe(2);
    });

    it('should change value in maxPriceInput to a value in minPriceInput in the first one is lesser', async () => {
      render(
        <Provider store={store} >
          <BrowserRouter>
            <CatalogFilter minPrice={minPrice} maxPrice={maxPrice} onClearFiltersButtonClick={jest.fn()} />
          </BrowserRouter>
        </Provider>
      );

      const minPriceInput = screen.getByTestId('minPriceInput');
      const maxPriceInput = screen.getByTestId('maxPriceInput');

      await userEvent.click(minPriceInput);
      await userEvent.type(minPriceInput, String(minPrice));
      await userEvent.click(maxPriceInput);
      await userEvent.type(maxPriceInput, String(lessThanMinimalPrice));
      await userEvent.click(minPriceInput);

      expect(screen.getAllByDisplayValue(minPrice).length).toBe(2);
    });
  });
});
