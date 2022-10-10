/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import dayjs from 'dayjs';
import { MAX_RATING } from '../../../const';
import { makeFakeReview } from '../../../mocks/mocks';
import ReviewCard from './review-card';

describe('testing ReviewCard component', () => {
  it('should render correctly', () => {
    const mockReview = makeFakeReview();
    const { userName, advantage, disadvantage, createAt, review, rating } = mockReview;
    render(
      <ReviewCard reviewData={mockReview} />
    );

    expect(screen.getByText(userName)).toBeInTheDocument();
    expect(screen.getAllByTestId('full_star').length).toBe(rating);
    expect(screen.getAllByTestId('star').length).toBe(MAX_RATING - rating);
    expect(screen.getByText(/Достоинства/i)).toBeInTheDocument();
    expect(screen.getByText(advantage)).toBeInTheDocument();
    expect(screen.getByText(/Недостатки/i)).toBeInTheDocument();
    expect(screen.getByText(disadvantage)).toBeInTheDocument();
    expect(screen.getByText(/Комментарий/i)).toBeInTheDocument();
    expect(screen.getByText(review)).toBeInTheDocument();
    expect(screen.getByText(dayjs(createAt).locale('ru').format('DD MMMM'))).toBeInTheDocument();
  });
});
