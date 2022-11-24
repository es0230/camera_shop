/**
 * @jest-environment jsdom
 */

import { configureMockStore } from '@jedmao/redux-mock-store';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { FilterCategories } from '../../../const';
import { makeFakeCamera } from '../../../mocks/mocks';
import { Camera } from '../../../types/camera';
import BasketModal from './basket-modal';

const mockStore = configureMockStore();
const mockCamera = { ...makeFakeCamera(), category: FilterCategories.Photo } as Camera;
const store = mockStore({
  DATA: {
    modalOpened: true,
    currentProduct: mockCamera
  }
});

describe('Testing BasketModal component', () => {
  const element = (
    <Provider store={store}>
      <BrowserRouter>
        <BasketModal />
      </BrowserRouter>
    </Provider>
  );

  it('should render correctly', () => {
    render(element);

    expect(screen.getByText(/Удалить этот товар?/)).toBeInTheDocument();
    expect(screen.getByText(mockCamera.name)).toBeInTheDocument();
    expect(screen.getByText(/Артикул:/)).toBeInTheDocument();
    expect(screen.getByText(mockCamera.vendorCode)).toBeInTheDocument();
    expect(screen.getByText(`${mockCamera.type} фотокамера`)).toBeInTheDocument();
    expect(screen.getByText(`${mockCamera.level} уровень`)).toBeInTheDocument();
    expect(screen.getByTestId('deleteButton')).toBeInTheDocument();
    expect(screen.getByText(/Продолжить покупки/)).toBeInTheDocument();
  });
});
