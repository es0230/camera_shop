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
import BasketList from './basket-list';

const mockCamera1 = { ...makeFakeCamera(), category: FilterCategories.Photo } as Camera;
const mockCamera2 = { ...makeFakeCamera(), category: FilterCategories.Photo } as Camera;

const mockStore = configureMockStore();

const store = mockStore({
  USER: {
    basket: {
      [mockCamera1.id]: 1,
      [mockCamera2.id]: 2,
    }
  }
});

describe('Testing BasketList component', () => {
  describe('should render correctly', () => {
    it('with products', () => {
      render(
        <Provider store={store} >
          <BrowserRouter>
            <BasketList cameras={[mockCamera1, mockCamera2]} />
          </BrowserRouter>
        </Provider>
      );

      expect(screen.getAllByTestId('basketItem').length).toBe(2);
      expect(screen.queryByText(/Корзина пока что пуста ;\(/)).not.toBeInTheDocument();
    });

    it('without products', () => {
      render(
        <Provider store={store} >
          <BrowserRouter>
            <BasketList cameras={[]} />
          </BrowserRouter>
        </Provider>
      );

      expect(screen.queryByTestId('basketItem')).not.toBeInTheDocument();
      expect(screen.getByText(/Корзина пока что пуста ;\(/)).toBeInTheDocument();
    });
  });
});

