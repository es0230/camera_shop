/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
import { INITIAL_REVIEWS } from '../../../const';
import { makeFakeReview } from '../../../mocks/mocks';
import { Review } from '../../../types/review';
import ProductReviews from './product-reviews';
import userEvent from '@testing-library/user-event';

describe('Testing ProductReviews component', () => {
  const mockSetState = jest.fn();
  describe('testing component render', () => {
    it('with no reviews', () => {
      const mockReviews: Review[] = [];

      render(
        <ProductReviews reviews={mockReviews} setModalOpened={mockSetState} />
      );

      expect(screen.getByText(/Отзывы/i)).toBeInTheDocument();
      expect(screen.getByText(/Оставить свой отзыв/i)).toBeInTheDocument();
      expect(screen.queryByText(/Показать больше отзывов/i)).not.toBeInTheDocument();
    });

    it('with 1 review', () => {
      const mockReviews: Review[] = [makeFakeReview()];

      render(
        <ProductReviews reviews={mockReviews} setModalOpened={mockSetState} />
      );

      expect(screen.getByText(/Отзывы/i)).toBeInTheDocument();
      expect(screen.getByText(/Оставить свой отзыв/i)).toBeInTheDocument();
      expect(screen.getAllByTestId('review_card').length).toBe(mockReviews.length);
      expect(screen.queryByText(/Показать больше отзывов/i)).not.toBeInTheDocument();
    });

    it('with 3 reviews', () => {
      const mockReviews: Review[] = Array.from({ length: INITIAL_REVIEWS }, () => makeFakeReview());

      render(
        <ProductReviews reviews={mockReviews} setModalOpened={mockSetState} />
      );

      expect(screen.getByText(/Отзывы/i)).toBeInTheDocument();
      expect(screen.getByText(/Оставить свой отзыв/i)).toBeInTheDocument();
      expect(screen.getAllByTestId('review_card').length).toBe(mockReviews.length);
      expect(screen.queryByText(/Показать больше отзывов/i)).not.toBeInTheDocument();
    });

    it('with more than 3 reviews', () => {
      const mockReviews: Review[] = Array.from({ length: INITIAL_REVIEWS + 1 }, () => makeFakeReview());

      render(
        <ProductReviews reviews={mockReviews} setModalOpened={mockSetState} />
      );

      expect(screen.getByText(/Отзывы/i)).toBeInTheDocument();
      expect(screen.getByText(/Оставить свой отзыв/i)).toBeInTheDocument();
      expect(screen.getAllByTestId('review_card').length).toBe(INITIAL_REVIEWS);
      expect(screen.getByText(/Показать больше отзывов/i)).toBeInTheDocument();
    });
  });

  describe('testing "Оставить свой отзыв" button', () => {
    it('should be clickable', async () => {
      const mockReviews: Review[] = [];

      render(
        <ProductReviews reviews={mockReviews} setModalOpened={mockSetState} />
      );

      const button = screen.getByText(/Оставить свой отзыв/i);
      expect(button).toBeInTheDocument();

      await userEvent.click(button);

      expect(mockSetState).toBeCalledTimes(1);
    });
  });

  describe('testing "Показать больше отзывов" button', () => {
    it('should show more reviews on click', async () => {
      const mockReviews: Review[] = Array.from({ length: INITIAL_REVIEWS + 1 }, () => makeFakeReview());

      render(
        <ProductReviews reviews={mockReviews} setModalOpened={mockSetState} />
      );

      const button = screen.getByText(/Показать больше отзывов/i);

      expect(button).toBeInTheDocument();
      expect(screen.getAllByTestId('review_card').length).toBe(INITIAL_REVIEWS);

      await userEvent.click(button);

      expect(screen.getAllByTestId('review_card').length).toBe(mockReviews.length);
    });

    it('should stay after click when there are reviews left', async () => {
      const mockReviews: Review[] = Array.from({ length: INITIAL_REVIEWS + 4 }, () => makeFakeReview());

      render(
        <ProductReviews reviews={mockReviews} setModalOpened={mockSetState} />
      );

      const button = screen.getByText(/Показать больше отзывов/i);

      expect(button).toBeInTheDocument();

      await userEvent.click(button);

      expect(button).toBeInTheDocument();
    });

    it('should disappear after click when there are no reviews left', async () => {
      const mockReviews: Review[] = Array.from({ length: INITIAL_REVIEWS + 3 }, () => makeFakeReview());

      render(
        <ProductReviews reviews={mockReviews} setModalOpened={mockSetState} />
      );

      const button = screen.getByText(/Показать больше отзывов/i);

      expect(button).toBeInTheDocument();

      await userEvent.click(button);

      expect(button).not.toBeInTheDocument();
    });
  });
});

