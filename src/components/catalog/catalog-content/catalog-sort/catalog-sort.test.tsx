/**
 * @jest-environment jsdom
 */

import { configureMockStore } from '@jedmao/redux-mock-store';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { SortOrder, SortType } from '../../../../const';
import CatalogSort from './catalog-sort';

const mockStore = configureMockStore();

const store = mockStore({
  FILTERS: {
    sort: {
      type: SortType.Price,
      order: SortOrder.Ascending,
    },
  },
});

const otherStore = mockStore({
  FILTERS: {
    sort: {
      type: SortType.Rating,
      order: SortOrder.Descending,
    },
  },
});

describe('Testing CatalogSort component', () => {
  it('should render correctly with initial params', () => {
    render(
      <Provider store={store} >
        <BrowserRouter>
          <CatalogSort onSortOrderButtonClick={jest.fn()} onSortTypeButtonClick={jest.fn()} />
        </BrowserRouter>
      </Provider>
    );

    const priceSort = screen.getByTestId('priceSort');
    const popularitySort = screen.getByTestId('popularitySort');
    const ascSort = screen.getByTestId('ascSort');
    const descSort = screen.getByTestId('descSort');

    expect(priceSort).toBeInTheDocument();
    expect(priceSort).toBeChecked();
    expect(popularitySort).toBeInTheDocument();
    expect(popularitySort).not.toBeChecked();
    expect(ascSort).toBeInTheDocument();
    expect(ascSort).toBeChecked();
    expect(descSort).toBeInTheDocument();
    expect(descSort).not.toBeChecked();
  });

  it('should render correctly with other params', () => {
    render(
      <Provider store={otherStore} >
        <BrowserRouter>
          <CatalogSort onSortOrderButtonClick={jest.fn()} onSortTypeButtonClick={jest.fn()} />
        </BrowserRouter>
      </Provider>
    );

    const priceSort = screen.getByTestId('priceSort');
    const popularitySort = screen.getByTestId('popularitySort');
    const ascSort = screen.getByTestId('ascSort');
    const descSort = screen.getByTestId('descSort');

    expect(priceSort).toBeInTheDocument();
    expect(priceSort).not.toBeChecked();
    expect(popularitySort).toBeInTheDocument();
    expect(popularitySort).toBeChecked();
    expect(ascSort).toBeInTheDocument();
    expect(ascSort).not.toBeChecked();
    expect(descSort).toBeInTheDocument();
    expect(descSort).toBeChecked();
  });
});
