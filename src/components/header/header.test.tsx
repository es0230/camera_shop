/**
 * @jest-environment jsdom
 */

import Header from './header';
import { configureMockStore } from '@jedmao/redux-mock-store';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const mockStore = configureMockStore();

describe('Testing Footer component', () => {
  describe('should render correctly', () => {
    it('with no items in basket', () => {
      const store = mockStore({
        USER: {
          basket: {
          }
        },
        DATA: {
          searchedCameras: [],
        }
      });

      render(
        <Provider store={store}>
          <BrowserRouter>
            <Header />
          </BrowserRouter>
        </Provider>
      );

      expect(screen.getByText(/Каталог/)).toBeInTheDocument();
      expect(screen.getByText(/Гарантии/)).toBeInTheDocument();
      expect(screen.getByText(/Доставка/)).toBeInTheDocument();
      expect(screen.getByText(/О компании/)).toBeInTheDocument();
      expect(screen.queryByTestId('basketIconCounter')).not.toBeInTheDocument();
    });

    it('with items in basket', () => {
      const store = mockStore({
        USER: {
          basket: {
            14: 2,
            1: 5,
          }
        },
        DATA: {
          searchedCameras: [],
        }
      });

      render(
        <Provider store={store}>
          <BrowserRouter>
            <Header />
          </BrowserRouter>
        </Provider>
      );

      expect(screen.getByTestId('basketIconCounter')).toBeInTheDocument();
      expect(screen.getByText('7')).toBeInTheDocument();
    });
  });
});
