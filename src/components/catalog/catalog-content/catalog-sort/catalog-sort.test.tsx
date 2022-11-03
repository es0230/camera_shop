/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { INITIAL_CATALOG_PAGE_URL_PARAMS, SortOrder, SortType } from '../../../../const';
import CatalogSort from './catalog-sort';

describe('Testing CatalogSort component', () => {
  it('should render correctly with initial params', () => {
    render(<CatalogSort handleSortOrderButtonClick={jest.fn()} handleSortTypeButtonClick={jest.fn()} params={INITIAL_CATALOG_PAGE_URL_PARAMS} />);

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
    render(<CatalogSort handleSortOrderButtonClick={jest.fn()} handleSortTypeButtonClick={jest.fn()} params={{ ...INITIAL_CATALOG_PAGE_URL_PARAMS, sortType: SortType.Rating, order: SortOrder.Descending }} />);

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
