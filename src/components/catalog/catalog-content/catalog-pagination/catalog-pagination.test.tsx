/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import CatalogPagination from './catalog-pagination';
import { BrowserRouter } from 'react-router-dom';
import { INITIAL_CATALOG_PAGE_URL_PARAMS } from '../../../../const';
describe('Testing catalogPagination component', () => {
  describe('should render correctly', () => {
    it('on first page', () => {
      const mockPageAmount = 3;

      render(
        <BrowserRouter>
          <CatalogPagination params={INITIAL_CATALOG_PAGE_URL_PARAMS} totalPageAmount={mockPageAmount} />
        </BrowserRouter>
      );

      expect(screen.queryByText(/Назад/)).not.toBeInTheDocument();
      expect(screen.getByText(/1/)).toBeInTheDocument();
      expect(screen.getByText(/2/)).toBeInTheDocument();
      expect(screen.getByText(/3/)).toBeInTheDocument();
      expect(screen.getByText(/Далее/)).toBeInTheDocument();
    });

    it('on last page', () => {
      const mockPageAmount = 3;
      const mockPageNumber = '3';

      render(
        <BrowserRouter>
          <CatalogPagination params={{ ...INITIAL_CATALOG_PAGE_URL_PARAMS, page: mockPageNumber }} totalPageAmount={mockPageAmount} />
        </BrowserRouter>
      );

      expect(screen.getByText(/Назад/)).toBeInTheDocument();
      expect(screen.getByText(/1/)).toBeInTheDocument();
      expect(screen.getByText(/2/)).toBeInTheDocument();
      expect(screen.getByText(/3/)).toBeInTheDocument();
      expect(screen.queryByText(/Далее/)).not.toBeInTheDocument();
    });

    it('on any page but first or last', () => {
      const mockPageAmount = 3;
      const mockPageNumber = '2';

      render(
        <BrowserRouter>
          <CatalogPagination params={{ ...INITIAL_CATALOG_PAGE_URL_PARAMS, page: mockPageNumber }} totalPageAmount={mockPageAmount} />
        </BrowserRouter>
      );

      expect(screen.getByText(/Назад/)).toBeInTheDocument();
      expect(screen.getByText(/1/)).toBeInTheDocument();
      expect(screen.getByText(/2/)).toBeInTheDocument();
      expect(screen.getByText(/3/)).toBeInTheDocument();
      expect(screen.getByText(/Далее/)).toBeInTheDocument();
    });
  });
});
