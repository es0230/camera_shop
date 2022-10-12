/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { makeFakeCamera } from '../../../mocks/mocks';
import { Camera } from '../../../types/camera';
import SimilarProducts from './similar-products';


describe('Testing SimilarProducts component', () => {
  const { id } = makeFakeCamera();
  describe('on render', () => {
    it('should not render when there is no similar products', () => {
      const mockCamerasResponse: Camera[] = [];

      render(
        <SimilarProducts id={id} similarProducts={mockCamerasResponse} />
      );

      expect(screen.queryByText(/Похожие товары/i)).not.toBeInTheDocument();
    });

    it('should render correctly when there are 1 card', () => {
      const mockCamerasResponse: Camera[] = [makeFakeCamera()];

      render(
        <BrowserRouter>
          <SimilarProducts id={id} similarProducts={mockCamerasResponse} />
        </BrowserRouter>
      );

      expect(screen.getByTestId('camera-card')).toBeInTheDocument();
      expect(screen.getByTestId('slider-controls--prev')).toBeDisabled();
      expect(screen.getByTestId('slider-controls--next')).toBeDisabled();
    });

    it('should render correctly when there are 3 cards', () => {
      const mockCamerasResponse: Camera[] = Array.from({ length: 3 }, () => makeFakeCamera());

      render(
        <BrowserRouter>
          <SimilarProducts id={id} similarProducts={mockCamerasResponse} />
        </BrowserRouter>
      );

      expect(screen.getAllByTestId('camera-card').length).toBe(3);
      expect(screen.getByTestId('slider-controls--prev')).toBeDisabled();
      expect(screen.getByTestId('slider-controls--next')).toBeDisabled();
    });

    it('should render correctly when there are more than 3 cards', () => {
      const mockCamerasResponse: Camera[] = Array.from({ length: 4 }, () => makeFakeCamera());

      render(
        <BrowserRouter>
          <SimilarProducts id={id} similarProducts={mockCamerasResponse} />
        </BrowserRouter>
      );

      expect(screen.getAllByTestId('camera-card').length).toBe(4);
      expect(screen.getByTestId('slider-controls--prev')).toBeDisabled();
      expect(screen.getByTestId('slider-controls--next')).not.toBeDisabled();
    });

    it('only three cards should be visible if there are more', () => {
      const mockCamerasResponse: Camera[] = Array.from({ length: 4 }, () => makeFakeCamera());

      render(
        <BrowserRouter>
          <SimilarProducts id={id} similarProducts={mockCamerasResponse} />
        </BrowserRouter>
      );

      expect(screen.getAllByTestId('camera-card').length).toBe(4);
      expect(screen.getAllByTestId('camera-card').filter((el) => el.classList.contains('is-active')).length).toBe(3);
    });
  });

  describe('on slider button click', () => {
    it('should change slider buttons status if there are no more after click', async () => {
      const mockCamerasResponse: Camera[] = Array.from({ length: 4 }, () => makeFakeCamera());

      render(
        <BrowserRouter>
          <SimilarProducts id={id} similarProducts={mockCamerasResponse} />
        </BrowserRouter>
      );

      const prevButton = screen.getByTestId('slider-controls--prev');
      const nextButton = screen.getByTestId('slider-controls--next');

      await userEvent.click(nextButton);

      expect(screen.getByTestId('slider-controls--prev')).not.toBeDisabled();
      expect(screen.getByTestId('slider-controls--next')).toBeDisabled();

      await userEvent.click(prevButton);

      expect(screen.getByTestId('slider-controls--prev')).toBeDisabled();
      expect(screen.getByTestId('slider-controls--next')).not.toBeDisabled();
    });
  });
});

export { };
