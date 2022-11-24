/**
 * @jest-environment jsdom
 */

import { configureMockStore } from '@jedmao/redux-mock-store';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { CouponStatus, FilterCategories, OrderStatus } from '../../../const';
import { makeFakeCamera } from '../../../mocks/mocks';
import { Camera } from '../../../types/camera';
import BasketSummary from './basket-summary';

const mockCamera1 = { ...makeFakeCamera(), category: FilterCategories.Photo } as Camera;
const mockCamera2 = { ...makeFakeCamera(), category: FilterCategories.Photo } as Camera;
const mockTotalPrice = mockCamera1.price + mockCamera2.price;

const mockStore = configureMockStore();

describe('Testing BasketSummary component', () => {
  describe('should render correctly', () => {
    it('initially', () => {
      const store = mockStore({
        USER: {
          productList: [mockCamera1, mockCamera2],
          basket: {
            [mockCamera1.id]: 1,
            [mockCamera2.id]: 2,
          },
          discount: 0,
          couponStatus: CouponStatus.Unknown,
          orderStatus: OrderStatus.Unknown,
        }
      });

      render(
        <Provider store={store} >
          <BrowserRouter>
            <BasketSummary totalPrice={mockTotalPrice} />
          </BrowserRouter>
        </Provider>
      );

      expect(screen.getByText(/Если у вас есть промокод на скидку, примените его в этом поле/)).toBeInTheDocument();
      expect(screen.getByTestId('inputLabel')).toBeInTheDocument();
      expect(screen.getByText(/Применить/)).toBeInTheDocument();
      expect(screen.getByText(/Всего:/)).toBeInTheDocument();
      expect(screen.getAllByText(`${mockTotalPrice} ₽`).length).toBe(2);
      expect(screen.getByText(/Скидка:/)).toBeInTheDocument();
      expect(screen.getByText(/^0 ₽/)).toBeInTheDocument();
      expect(screen.getByText(/К оплате:/)).toBeInTheDocument();
      expect(screen.getByText(/Оформить заказ/)).toBeInTheDocument();
    });

    it('when coupon is invalid', () => {
      const store = mockStore({
        USER: {
          productList: [mockCamera1, mockCamera2],
          basket: {
            [mockCamera1.id]: 1,
            [mockCamera2.id]: 2,
          },
          discount: 0,
          couponStatus: CouponStatus.Invalid,
          orderStatus: OrderStatus.Unknown,
        }
      });

      render(
        <Provider store={store} >
          <BrowserRouter>
            <BasketSummary totalPrice={mockTotalPrice} />
          </BrowserRouter>
        </Provider>
      );

      expect(screen.getByText(/Промокод неверный/)).toBeInTheDocument();
    });

    it('when coupon is valid', () => {
      const store = mockStore({
        USER: {
          productList: [mockCamera1, mockCamera2],
          basket: {
            [mockCamera1.id]: 1,
            [mockCamera2.id]: 2,
          },
          discount: 10,
          couponStatus: CouponStatus.Valid,
          orderStatus: OrderStatus.Unknown,
        }
      });

      render(
        <Provider store={store} >
          <BrowserRouter>
            <BasketSummary totalPrice={mockTotalPrice} />
          </BrowserRouter>
        </Provider>
      );

      expect(screen.getByText(/Промокод принят!/)).toBeInTheDocument();
      expect(screen.getByText(/Всего:/)).toBeInTheDocument();
      expect(screen.getByText(`${mockTotalPrice} ₽`)).toBeInTheDocument();
      expect(screen.getByText(/Скидка:/)).toBeInTheDocument();
      expect(screen.getByText(`${(mockTotalPrice * 0.1).toFixed(1)} ₽`)).toBeInTheDocument();
      expect(screen.getByText(/К оплате:/)).toBeInTheDocument();
      expect(screen.getByText(`${(mockTotalPrice * 0.9).toFixed(1)} ₽`)).toBeInTheDocument();
    });
  });

  it('testing buttons', () => {
    const store = mockStore({
      USER: {
        productList: [mockCamera1, mockCamera2],
        basket: {
          [mockCamera1.id]: 1,
          [mockCamera2.id]: 2,
        },
        discount: 0,
        couponStatus: CouponStatus.Unknown,
        orderStatus: OrderStatus.Unknown,
      }
    });

    render(
      <Provider store={store} >
        <BrowserRouter>
          <BasketSummary totalPrice={mockTotalPrice} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId('applyCouponButton')).toBeEnabled();
    expect(screen.getByTestId('postOrderButton')).toBeEnabled();
  });
});
