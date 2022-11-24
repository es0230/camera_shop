/**
 * @jest-environment jsdom
 */

import { configureMockStore } from '@jedmao/redux-mock-store';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { FilterCategories } from '../../const';
import { makeFakeCamera } from '../../mocks/mocks';
import { Camera } from '../../types/camera';
import ProductModal from './product-modal';

const mockStore = configureMockStore();
const mockCamera = { ...makeFakeCamera(), category: FilterCategories.Photo } as Camera;
const store = mockStore({
  DATA: {
    modalOpened: true,
    currentProduct: mockCamera
  }
});

const element = (
  <Provider store={store}>
    <BrowserRouter>
      <ProductModal />
    </BrowserRouter>
  </Provider>
);

describe('Testing ProductModal component', () => {
  it('should render correctly', () => {
    render(element);

    expect(screen.getByText(/Добавить товар в корзину/)).toBeInTheDocument();
    expect(screen.getByText(mockCamera.name)).toBeInTheDocument();
    expect(screen.getByText(/Артикул:/)).toBeInTheDocument();
    expect(screen.getByText(mockCamera.vendorCode)).toBeInTheDocument();
    expect(screen.getByText(`${mockCamera.type} фотокамера`)).toBeInTheDocument();
    expect(screen.getByText(`${mockCamera.level} уровень`)).toBeInTheDocument();
    expect(screen.getByTestId('addToBasketButton')).toBeInTheDocument();
    expect(screen.getByTestId('closeButton')).toBeInTheDocument();
  });

  it('buttons should be clickable', () => {
    render(element);

    expect(screen.getByTestId('addToBasketButton')).toBeEnabled();
    expect(screen.getByTestId('closeButton')).toBeEnabled();
  });
});
