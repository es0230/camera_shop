/**
 * @jest-environment jsdom
 */

import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AppRoute } from '../../const';
import { makeFakeCamera, makeFakePromo } from '../../mocks/mocks';
import HistoryRouter from '../history-router/history-router';
import '@testing-library/jest-dom';
import App from './app';

const mockStore = configureMockStore();

const store = mockStore({
  DATA: { cameras: [makeFakeCamera()], promo: makeFakePromo(), isDataLoaded: false },
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Testing App component', () => {
  it('should render Catalog when user navigate to "/catalog/1"', async () => {
    history.push(AppRoute.Catalog(1));

    render(fakeApp);

    expect(history.location.pathname).toBe(AppRoute.Catalog(1));

    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
  });
});
