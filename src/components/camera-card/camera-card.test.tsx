/**
 * @jest-environment jsdom
 */

import { configureMockStore } from '@jedmao/redux-mock-store';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AppRoute, TabType } from '../../const';
import { makeFakeCamera } from '../../mocks/mocks';
import HistoryRouter from '../history-router/history-router';
import CameraCard from './camera-card';

const mockStore = configureMockStore();
describe('Testing CameraCard component', () => {
  const mockCamera = makeFakeCamera();

  it('should render camera card correctly', () => {
    render(
      <BrowserRouter>
        <CameraCard camera={mockCamera} />
      </BrowserRouter>
    );

    expect(screen.getByText(mockCamera.name)).toBeInTheDocument();
    expect(screen.getByText(mockCamera.rating)).toBeInTheDocument();
    expect(screen.getByText(mockCamera.reviewCount)).toBeInTheDocument();
    expect(screen.getByText(mockCamera.price)).toBeInTheDocument();
    expect(screen.getByText('Купить')).toBeInTheDocument();
    expect(screen.getByText('Подробнее')).toBeInTheDocument();
  });

  it('should navigate to Product on button click', async () => {
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <CameraCard camera={mockCamera} />
        </HistoryRouter>
      </Provider>
    );

    const button = screen.getByText(/Подробнее/i);

    await userEvent.click(button);
    expect(history.location.pathname).toBe(AppRoute.Product(mockCamera.id, TabType.Perks));
  });
});
