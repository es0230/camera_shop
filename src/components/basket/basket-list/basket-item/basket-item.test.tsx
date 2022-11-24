/**
 * @jest-environment jsdom
 */

import { configureMockStore } from '@jedmao/redux-mock-store';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { FilterCategories } from '../../../../const';
import { makeFakeCamera } from '../../../../mocks/mocks';
import { Camera } from '../../../../types/camera';
import BasketItem from './basket-item';

const mockStore = configureMockStore();
const mockCamera = { ...makeFakeCamera(), category: FilterCategories.Photo } as Camera;
const mockCount = 3;
const store = mockStore({
  DATA: {
    modalOpened: false,
  }
});

describe('Testing BasketItem component', () => {
  const element = (
    <Provider store={store}>
      <BrowserRouter>
        <BasketItem camera={mockCamera} count={mockCount} />
      </BrowserRouter>
    </Provider>
  );

  it('should render correctly', () => {
    render(element);

    expect(screen.getByText(mockCamera.name)).toBeInTheDocument();
    expect(screen.getByText(/Артикул:/)).toBeInTheDocument();
    expect(screen.getByText(mockCamera.vendorCode)).toBeInTheDocument();
    expect(screen.getByText(`${mockCamera.type} фотокамера`)).toBeInTheDocument();
    expect(screen.getByText(`${mockCamera.level} уровень`)).toBeInTheDocument();
    expect(screen.getByText(`${mockCamera.price} ₽`)).toBeInTheDocument();
    expect(screen.getByText(`${mockCamera.price * mockCount} ₽`)).toBeInTheDocument();
    expect(screen.getByTestId('crossButton')).toBeInTheDocument();
  });

  describe('testing buttons', () => {
    describe('increase button', () => {
      it('should increase count', async () => {
        render(element);

        expect(screen.getByTestId('counter')).toHaveValue(mockCount);

        await userEvent.click(screen.getByTestId('increaseButton'));

        expect(screen.getByTestId('counter')).toHaveValue(mockCount + 1);
      });

      it('should be blocked on currentCount = 99', () => {
        render(
          <Provider store={store}>
            <BrowserRouter>
              <BasketItem camera={mockCamera} count={99} />
            </BrowserRouter>
          </Provider>
        );

        const increaseButton = screen.getByTestId('increaseButton');

        expect(increaseButton).toBeDisabled();
      });
    });

    describe('decrease button', () => {
      it('should decrease count', async () => {
        render(element);

        expect(screen.getByTestId('counter')).toHaveValue(mockCount);

        await userEvent.click(screen.getByTestId('decreaseButton'));

        expect(screen.getByTestId('counter')).toHaveValue(mockCount - 1);
      });

      it('should be blocked on currentCount = 1', () => {
        render(
          <Provider store={store}>
            <BrowserRouter>
              <BasketItem camera={mockCamera} count={1} />
            </BrowserRouter>
          </Provider>
        );

        const increaseButton = screen.getByTestId('decreaseButton');

        expect(increaseButton).toBeDisabled();
      });
    });

    describe('delete button', () => {
      it('should be clickable', () => {
        render(
          <Provider store={store}>
            <BrowserRouter>
              <BasketItem camera={mockCamera} count={1} />
            </BrowserRouter>
          </Provider>
        );

        const deleteButton = screen.getByTestId('deleteButton');

        expect(deleteButton).toBeEnabled();
      });
    });
  });
});
