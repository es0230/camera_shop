/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import CatalogPagination from './catalog-pagination';
import { BrowserRouter } from 'react-router-dom';
import { INITIAL_CATALOG_PAGE_URL_PARAMS } from '../../../../const';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';

const mockStore = configureMockStore();

const store = mockStore({
  DATA: {
    totalCount: '40',
  },
});

describe('Testing catalogPagination component', () => {
  describe('should render correctly', () => {
    it('on first page', () => {
      render(
        <Provider store={store} >
          <BrowserRouter>
            <CatalogPagination params={INITIAL_CATALOG_PAGE_URL_PARAMS} />
          </BrowserRouter>
        </Provider>
      );

      expect(screen.queryByText(/Назад/)).not.toBeInTheDocument();
      expect(screen.getByText(/1/)).toBeInTheDocument();
      expect(screen.getByText(/2/)).toBeInTheDocument();
      expect(screen.getByText(/3/)).toBeInTheDocument();
      expect(screen.getByText(/4/)).toBeInTheDocument();
      expect(screen.getByText(/5/)).toBeInTheDocument();
      expect(screen.getByText(/Далее/)).toBeInTheDocument();
    });

    it('on last page', () => {
      const mockPageNumber = '5';

      render(
        <Provider store={store} >
          <BrowserRouter>
            <CatalogPagination params={{ ...INITIAL_CATALOG_PAGE_URL_PARAMS, page: mockPageNumber }} />
          </BrowserRouter>
        </Provider>
      );

      expect(screen.getByText(/Назад/)).toBeInTheDocument();
      expect(screen.getByText(/1/)).toBeInTheDocument();
      expect(screen.getByText(/2/)).toBeInTheDocument();
      expect(screen.getByText(/3/)).toBeInTheDocument();
      expect(screen.getByText(/4/)).toBeInTheDocument();
      expect(screen.getByText(/5/)).toBeInTheDocument();
      expect(screen.queryByText(/Далее/)).not.toBeInTheDocument();
    });

    it('on any page but first or last', () => {
      const mockPageNumber = '2';

      render(
        <Provider store={store} >
          <BrowserRouter>
            <CatalogPagination params={{ ...INITIAL_CATALOG_PAGE_URL_PARAMS, page: mockPageNumber }} />
          </BrowserRouter>
        </Provider>
      );

      expect(screen.getByText(/Назад/)).toBeInTheDocument();
      expect(screen.getByText(/1/)).toBeInTheDocument();
      expect(screen.getByText(/2/)).toBeInTheDocument();
      expect(screen.getByText(/3/)).toBeInTheDocument();
      expect(screen.getByText(/4/)).toBeInTheDocument();
      expect(screen.getByText(/5/)).toBeInTheDocument();
      expect(screen.getByText(/Далее/)).toBeInTheDocument();
    });
  });
});
