/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { makeFakeCamera, makeFakePromo, makeFakeReview } from '../../../mocks/mocks';
import HistoryRouter from '../../history-router/history-router';
import SearchForm from './search-form';

const fakeCamera1 = { ...makeFakeCamera(), name: 'Camera Nicon', id: 1 };
const fakeCamera2 = { ...makeFakeCamera(), name: 'Camera Canon', id: 2 };
const fakeCamera3 = { ...makeFakeCamera(), name: 'Videocamera', id: 3 };
const fakeCamera4 = { ...makeFakeCamera(), name: 'Polaroid', id: 4 };

const mockStore = configureMockStore();

const store = mockStore({
  DATA: {
    cameras: [fakeCamera1, fakeCamera2, fakeCamera3, fakeCamera4],
    promo: makeFakePromo(),
    isDataLoaded: false,
    isLoadingFailed: false,
    currentProduct: makeFakeCamera(),
    currentReviews: [makeFakeReview()],
    currentSimilarProducts: [makeFakeCamera()],
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

    const searchInput = screen.getByTestId('searchInput');

    await userEvent.type(searchInput, 'camera');

    expect(screen.getAllByTestId('searchItem').length).toBe(3);
  });

  it('clear button should work correctly', async () => {
    render(fakeApp);

    const searchInput = screen.getByTestId('searchInput');
    const clearButton = screen.getByTestId('clearButton');

    await userEvent.type(searchInput, 'c');

    expect(screen.getAllByTestId('searchItem').length).toBe(3);

    await userEvent.click(clearButton);

    expect(screen.queryByTestId('searchItem')).not.toBeInTheDocument();
  });
});
