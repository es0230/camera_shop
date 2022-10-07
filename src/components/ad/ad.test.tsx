/**
 * @jest-environment jsdom
 */

import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen, } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { makeFakePromo } from '../../mocks/mocks';
import '@testing-library/jest-dom';
import Ad from './ad';
import HistoryRouter from '../history-router/history-router';
import { createMemoryHistory } from 'history';
import { AppRoute, TabType } from '../../const';

const mockStore = configureMockStore();

describe('Testing Ad component', () => {
  describe('when there is a promo', () => {
    const mockPromo = makeFakePromo();
    it('should render correctly when there is a promo', () => {
      render(
        <Provider store={mockStore({})}>
          <BrowserRouter>
            <Ad ad={mockPromo} />
          </BrowserRouter>
        </Provider>
      );

      expect(screen.getByText(/Новинка!/i)).toBeInTheDocument();
      expect(screen.getByText(mockPromo.name)).toBeInTheDocument();
      expect(screen.getByText(/Профессиональная камера от известного производителя/i)).toBeInTheDocument();
      expect(screen.getByText(/Подробнее/i)).toBeInTheDocument();
    });

    it('should navigate to Product on button click', async () => {
      const history = createMemoryHistory();

      render(
        <Provider store={mockStore({})}>
          <HistoryRouter history={history}>
            <Ad ad={mockPromo} />
          </HistoryRouter>
        </Provider>
      );

      const button = screen.getByText(/Подробнее/i);

      await userEvent.click(button);
      expect(history.location.pathname).toBe(AppRoute.Product(mockPromo.id, TabType.Perks));
    });
  });

  describe('when there is no promo', () => {
    const mockPromo = null;
    it('should not render when there is no promo', () => {
      render(
        <Provider store={mockStore({})}>
          <BrowserRouter>
            <Ad ad={mockPromo} />
          </BrowserRouter>
        </Provider>
      );

      expect(screen.queryByText(/Новинка!/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Профессиональная камера от известного производителя/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Подробнее/i)).not.toBeInTheDocument();
    });
  });
});
