/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';
import { AppRoute, TabType } from '../../../const';
import { makeFakeCamera } from '../../../mocks/mocks';
import HistoryRouter from '../../history-router/history-router';
import ProductCard from './product-card';

describe('Testing ProductCard component', () => {
  const mockCamera = makeFakeCamera();
  const { name, reviewCount, price, category, type, level, vendorCode, description, id } = mockCamera;
  const history = createMemoryHistory();

  it('should render product card correctly', () => {
    render(
      <HistoryRouter history={history}>
        <ProductCard currentProduct={mockCamera} />
      </HistoryRouter>
    );

    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByText(reviewCount)).toBeInTheDocument();
    expect(screen.getByText(`${price} ₽`)).toBeInTheDocument();
    expect(screen.getByText(/Добавить в корзину/i)).toBeInTheDocument();
    expect(screen.getByText(/Характеристики/i)).toBeInTheDocument();
    expect(screen.getByText(/Описание/i)).toBeInTheDocument();
    expect(screen.getByText(reviewCount)).toBeInTheDocument();
    expect(screen.getByText(/Артикул:/i)).toBeInTheDocument();
    expect(screen.getByText(vendorCode)).toBeInTheDocument();
    expect(screen.getByText(/Категория:/i)).toBeInTheDocument();
    expect(screen.getByText(category)).toBeInTheDocument();
    expect(screen.getByText(/Тип камеры:/i)).toBeInTheDocument();
    expect(screen.getByText(type)).toBeInTheDocument();
    expect(screen.getByText(/Уровень:/i)).toBeInTheDocument();
    expect(screen.getByText(level)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
  });
  describe('on Perks tab', () => {
    beforeEach(() => history.push(AppRoute.Product(id, TabType.Perks)));
    it('should render product card correctly', () => {
      render(
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Product()} element={<ProductCard currentProduct={mockCamera} />} />
          </Routes>
        </HistoryRouter>
      );

      expect(screen.getByTestId('perks-tab').classList).toContain('is-active');

      expect(screen.getByTestId('description-tab').classList).not.toContain('is-active');
    });

    it('should open Description tab on button click', async () => {
      render(
        <HistoryRouter history={history}>
          <ProductCard currentProduct={mockCamera} />
        </HistoryRouter>
      );

      const button = screen.getByText(/Описание/i);

      await userEvent.click(button);

      expect(history.location.pathname).toBe(AppRoute.Product(id, TabType.Description));
    });
  });

  describe('on Description tab', () => {
    beforeEach(() => history.push(`${AppRoute.Product(id, TabType.Description)}`));
    it('should render product card correctly', () => {
      render(
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Product()} element={<ProductCard currentProduct={mockCamera} />} />
          </Routes>
        </HistoryRouter>
      );

      expect(screen.getByTestId('perks-tab').classList).not.toContain('is-active');

      expect(screen.getByTestId('description-tab').classList).toContain('is-active');
    });

    it('should open Perks tab on button click', async () => {
      render(
        <HistoryRouter history={history}>
          <ProductCard currentProduct={mockCamera} />
        </HistoryRouter>
      );

      const button = screen.getByText(/Характеристики/i);

      await userEvent.click(button);

      expect(history.location.pathname).toBe(AppRoute.Product(id, TabType.Perks));
    });
  });
});
