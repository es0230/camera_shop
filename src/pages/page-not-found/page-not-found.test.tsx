/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PageNotFound from './page-not-found';
import userEvent from '@testing-library/user-event';
import HistoryRouter from '../../components/history-router/history-router';
import { createMemoryHistory } from 'history';
import { AppRoute } from '../../const';

describe('Testing PageNotFound component', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <PageNotFound />
      </BrowserRouter>
    );

    expect(screen.getByText(/Страница не найдена/)).toBeInTheDocument();
    expect(screen.getByText(/Вернуться на главную/)).toBeInTheDocument();
  });

  it('button should be clickable', async () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <PageNotFound />
      </HistoryRouter>
    );

    const button = screen.getByText(/Вернуться на главную/);

    await userEvent.click(button);

    expect(history.location.pathname).toBe(AppRoute.Catalog(1));
  });
});
