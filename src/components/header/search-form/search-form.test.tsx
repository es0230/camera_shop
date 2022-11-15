/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { makeFakeCamera } from '../../../mocks/mocks';
import HistoryRouter from '../../history-router/history-router';
import SearchForm from './search-form';
import { createAPI } from '../../../services/api';
import thunk from 'redux-thunk';
import { State } from '../../../types/state';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';

const fakeCamera1 = { ...makeFakeCamera(), name: 'Camera Nicon', id: 1 };
const fakeCamera2 = { ...makeFakeCamera(), name: 'Camera Canon', id: 2 };
const fakeCamera3 = { ...makeFakeCamera(), name: 'Videocamera', id: 3 };
const fakeCamera4 = { ...makeFakeCamera(), name: 'Polaroid', id: 4 };

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const store = mockStore({
  DATA: {
    searchedCameras: [fakeCamera1, fakeCamera2, fakeCamera3, fakeCamera4],
  },
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <SearchForm />
    </HistoryRouter>
  </Provider>
);


describe('Testing Search form component', () => {
  it('should show search results correctly', async () => {
    render(fakeApp);

    expect(screen.getAllByTestId('searchItem').length).toBe(4);
  });

  it('clear button should work correctly', async () => {
    render(fakeApp);

    const clearButton = screen.getByTestId('clearButton');

    expect(screen.getAllByTestId('searchItem').length).toBe(4);

    await userEvent.click(clearButton);

    expect(screen.queryByTestId('formSearch')?.classList.contains('list-opened')).toBe(false);
  });
});
