/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import HistoryRouter from '../../components/history-router/history-router';
import { createMemoryHistory } from 'history';
import { AppRoute, INITIAL_CATALOG_PAGE_URL_PARAMS } from '../../const';
import OrderFailed from './order-failed';

describe('Testing PageNotFound component', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <OrderFailed />
      </BrowserRouter>
    );

    expect(screen.getByText(/Не удалось разместить заказ ;\(/)).toBeInTheDocument();
    expect(screen.getByText(/Попробуйте позже/)).toBeInTheDocument();
    expect(screen.getByText(/Вернуться на главную/)).toBeInTheDocument();
  });

  it('button should be clickable', async () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <OrderFailed />
      </HistoryRouter>
    );

    const button = screen.getByText(/Вернуться на главную/);

    await userEvent.click(button);

    expect(history.location.pathname).toBe(AppRoute.Catalog(INITIAL_CATALOG_PAGE_URL_PARAMS));
  });
});
