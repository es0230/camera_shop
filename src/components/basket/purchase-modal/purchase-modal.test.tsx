/**
 * @jest-environment jsdom
 */

import { configureMockStore } from '@jedmao/redux-mock-store';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { OrderStatus } from '../../../const';
import PurchaseModal from './purchase-modal';

const mockStore = configureMockStore();
const store = mockStore({
  USER: {
    orderStatus: OrderStatus.Success,
  }
});

const element = (
  <Provider store={store}>
    <BrowserRouter>
      <PurchaseModal />
    </BrowserRouter>
  </Provider>
);

describe('Testing PurchaseModal component', () => {
  it('should render correctly', () => {
    render(element);

    expect(screen.getByText(/Спасибо за покупку/)).toBeInTheDocument();
  });

  it('buttons should be clickable', () => {
    render(element);

    expect(screen.getByTestId('backToShoppingButton')).toBeEnabled();
    expect(screen.getByTestId('closeButton')).toBeEnabled();
  });
});
