/**
 * @jest-environment jsdom
 */

import { configureMockStore } from '@jedmao/redux-mock-store';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ReviewModal from './review-modal';
import { createAPI } from '../../../services/api';
import { State } from '../../../types/state';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
describe('Testing ReviewModal component', () => {
  let isActive = true;
  const setIsActive = jest.fn(() => (isActive = !isActive));
  const setIsNeededUpdate = jest.fn();

  const api = createAPI();
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should render correctly', () => {
    render(
      <Provider store={mockStore()}>
        <BrowserRouter>
          <ReviewModal isActive={isActive} setIsActive={setIsActive} setIsNeededUpdate={setIsNeededUpdate} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Оставить отзыв/)).toBeInTheDocument();
    expect(screen.getByText(/Рейтинг/)).toBeInTheDocument();
    expect(screen.getByTestId('form-rate').classList.contains('is-invalid')).toBe(false);
    expect(screen.getByText(/Ваше имя/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Введите ваше имя/)).toBeInTheDocument();
    expect(screen.getByTestId('form-name').classList.contains('is-invalid')).toBe(false);
    expect(screen.getByText(/Достоинства/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Основные преимущества товара/)).toBeInTheDocument();
    expect(screen.getByTestId('form-advantage').classList.contains('is-invalid')).toBe(false);
    expect(screen.getByText(/Недостатки/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Главные недостатки товара/)).toBeInTheDocument();
    expect(screen.getByTestId('form-disadvantage').classList.contains('is-invalid')).toBe(false);
    expect(screen.getByText(/Комментарий/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Поделитесь своим опытом покупки/)).toBeInTheDocument();
    expect(screen.getByTestId('form-comment').classList.contains('is-invalid')).toBe(false);
    expect(screen.getByText(/Отправить отзыв/)).toBeInTheDocument();
    expect(screen.getAllByTestId('snowflake-icon').length).toBe(5);
    expect(screen.getByTestId('close-icon')).toBeInTheDocument();
  });

  describe('should display correctly when', () => {
    it('changing rating fields', async () => {
      render(
        <Provider store={mockStore()}>
          <BrowserRouter>
            <ReviewModal isActive={isActive} setIsActive={setIsActive} setIsNeededUpdate={setIsNeededUpdate} />
          </BrowserRouter>
        </Provider>
      );

      const star1 = screen.getByTitle('Ужасно');
      const star2 = screen.getByTitle('Плохо');
      const star3 = screen.getByTitle('Нормально');
      const star4 = screen.getByTitle('Хорошо');
      const star5 = screen.getByTitle('Отлично');

      await userEvent.click(star1);
      expect(screen.getByText(/1/)).toBeInTheDocument();
      await userEvent.click(star2);
      expect(screen.getByText(/2/)).toBeInTheDocument();
      await userEvent.click(star3);
      expect(screen.getByText(/3/)).toBeInTheDocument();
      await userEvent.click(star4);
      expect(screen.getByText(/4/)).toBeInTheDocument();
      await userEvent.click(star5);
      expect(screen.getAllByText(/5/).filter((el) => el.classList.contains('rate__stars')).length).toBe(1);
      await userEvent.click(star1);
      expect(screen.getByText(/1/)).toBeInTheDocument();
    });

    it('changing name field', async () => {
      render(
        <Provider store={mockStore()}>
          <BrowserRouter>
            <ReviewModal isActive={isActive} setIsActive={setIsActive} setIsNeededUpdate={setIsNeededUpdate} />
          </BrowserRouter>
        </Provider>
      );

      const nameInput = screen.getByPlaceholderText('Введите ваше имя');
      const formName = screen.getByTestId('form-name');

      await userEvent.type(nameInput, 'John Doe');
      expect(formName.classList.contains('is-invalid')).toBe(false);

      await userEvent.clear(nameInput);
      expect(formName.classList.contains('is-invalid')).toBe(true);

      await userEvent.type(nameInput, 'lol');
      expect(formName.classList.contains('is-invalid')).toBe(false);
    });

    it('changing advantage field', async () => {
      render(
        <Provider store={mockStore()}>
          <BrowserRouter>
            <ReviewModal isActive={isActive} setIsActive={setIsActive} setIsNeededUpdate={setIsNeededUpdate} />
          </BrowserRouter>
        </Provider>
      );

      const advantageInput = screen.getByPlaceholderText('Основные преимущества товара');
      const formAdvantage = screen.getByTestId('form-advantage');

      await userEvent.type(advantageInput, 'Nice');
      expect(formAdvantage.classList.contains('is-invalid')).toBe(false);

      await userEvent.clear(advantageInput);
      expect(formAdvantage.classList.contains('is-invalid')).toBe(true);

      await userEvent.type(advantageInput, 'lol');
      expect(formAdvantage.classList.contains('is-invalid')).toBe(false);
    });

    it('changing disadvantage field', async () => {
      render(
        <Provider store={mockStore()}>
          <BrowserRouter>
            <ReviewModal isActive={isActive} setIsActive={setIsActive} setIsNeededUpdate={setIsNeededUpdate} />
          </BrowserRouter>
        </Provider>
      );

      const disadvantageInput = screen.getByPlaceholderText('Главные недостатки товара');
      const formDisadvantage = screen.getByTestId('form-disadvantage');

      await userEvent.type(disadvantageInput, 'Bad');
      expect(formDisadvantage.classList.contains('is-invalid')).toBe(false);

      await userEvent.clear(disadvantageInput);
      expect(formDisadvantage.classList.contains('is-invalid')).toBe(true);

      await userEvent.type(disadvantageInput, 'lol');
      expect(formDisadvantage.classList.contains('is-invalid')).toBe(false);
    });

    it('changing comment field', async () => {
      render(
        <Provider store={mockStore()}>
          <BrowserRouter>
            <ReviewModal isActive={isActive} setIsActive={setIsActive} setIsNeededUpdate={setIsNeededUpdate} />
          </BrowserRouter>
        </Provider>
      );

      const commentInput = screen.getByPlaceholderText('Поделитесь своим опытом покупки');
      const formComment = screen.getByTestId('form-comment');

      await userEvent.type(commentInput, 'n');
      expect(formComment.classList.contains('is-invalid')).toBe(true);

      await userEvent.type(commentInput, 'eve');
      expect(formComment.classList.contains('is-invalid')).toBe(true);

      await userEvent.type(commentInput, 'r');
      expect(formComment.classList.contains('is-invalid')).toBe(false);

      await userEvent.type(commentInput, '{backspace}');
      expect(formComment.classList.contains('is-invalid')).toBe(true);

      await userEvent.type(commentInput, 'g');
      expect(formComment.classList.contains('is-invalid')).toBe(false);
    });
  });

  describe('when trying to send', () => {
    it('should prevent if fields are unchanged', async () => {
      render(
        <Provider store={mockStore()}>
          <BrowserRouter>
            <ReviewModal isActive={isActive} setIsActive={setIsActive} setIsNeededUpdate={setIsNeededUpdate} />
          </BrowserRouter>
        </Provider>
      );

      const formRate = screen.getByTestId('form-rate');
      const formName = screen.getByTestId('form-name');
      const formAdvantage = screen.getByTestId('form-advantage');
      const formDisadvantage = screen.getByTestId('form-disadvantage');
      const formComment = screen.getByTestId('form-comment');
      const sendButton = screen.getByTestId('send-button');

      await userEvent.click(sendButton);

      expect(formRate.classList.contains('is-invalid')).toBe(true);
      expect(formName.classList.contains('is-invalid')).toBe(true);
      expect(formAdvantage.classList.contains('is-invalid')).toBe(true);
      expect(formDisadvantage.classList.contains('is-invalid')).toBe(true);
      expect(formComment.classList.contains('is-invalid')).toBe(true);

      expect(setIsNeededUpdate).toBeCalledTimes(0);
    });

    it('should prevent if one of the fields is unchanged', async () => {
      render(
        <Provider store={mockStore()}>
          <BrowserRouter>
            <ReviewModal isActive={isActive} setIsActive={setIsActive} setIsNeededUpdate={setIsNeededUpdate} />
          </BrowserRouter>
        </Provider>
      );

      const star4 = screen.getByTitle('Хорошо');
      const formRate = screen.getByTestId('form-rate');
      const nameInput = screen.getByPlaceholderText('Введите ваше имя');
      const formName = screen.getByTestId('form-name');
      const advantageInput = screen.getByPlaceholderText('Основные преимущества товара');
      const formAdvantage = screen.getByTestId('form-advantage');
      const formDisadvantage = screen.getByTestId('form-disadvantage');
      const commentInput = screen.getByPlaceholderText('Поделитесь своим опытом покупки');
      const formComment = screen.getByTestId('form-comment');
      const sendButton = screen.getByTestId('send-button');

      await userEvent.click(star4);
      await userEvent.type(nameInput, 'never');
      await userEvent.type(advantageInput, 'gonna');
      await userEvent.type(commentInput, 'give you up');
      await userEvent.click(sendButton);

      expect(formRate.classList.contains('is-invalid')).toBe(false);
      expect(formName.classList.contains('is-invalid')).toBe(false);
      expect(formAdvantage.classList.contains('is-invalid')).toBe(false);
      expect(formDisadvantage.classList.contains('is-invalid')).toBe(true);
      expect(formComment.classList.contains('is-invalid')).toBe(false);

      expect(setIsNeededUpdate).toBeCalledTimes(0);
    });

    it('should send review if all fields are changed', async () => {
      render(
        <Provider store={mockStore()}>
          <BrowserRouter>
            <ReviewModal isActive={isActive} setIsActive={setIsActive} setIsNeededUpdate={setIsNeededUpdate} />
          </BrowserRouter>
        </Provider>
      );

      const star4 = screen.getByTitle('Хорошо');
      const nameInput = screen.getByPlaceholderText('Введите ваше имя');
      const advantageInput = screen.getByPlaceholderText('Основные преимущества товара');
      const disadvantageInput = screen.getByPlaceholderText('Главные недостатки товара');
      const commentInput = screen.getByPlaceholderText('Поделитесь своим опытом покупки');
      const sendButton = screen.getByTestId('send-button');

      expect(screen.queryByText(/Спасибо за отзыв/)).not.toBeInTheDocument();

      await userEvent.click(star4);
      await userEvent.type(nameInput, 'never');
      await userEvent.type(advantageInput, 'gonna');
      await userEvent.type(disadvantageInput, 'let');
      await userEvent.type(commentInput, 'you down');
      await userEvent.click(sendButton);

      expect(setIsNeededUpdate).toBeCalledTimes(1);
    });

    it('should render review succeed modal on successful review sending', async () => {
      render(
        <Provider store={mockStore()}>
          <BrowserRouter>
            <ReviewModal isActive={isActive} setIsActive={setIsActive} setIsNeededUpdate={setIsNeededUpdate} />
          </BrowserRouter>
        </Provider>
      );

      const star4 = screen.getByTitle('Хорошо');
      const formRate = screen.getByTestId('form-rate');
      const nameInput = screen.getByPlaceholderText('Введите ваше имя');
      const formName = screen.getByTestId('form-name');
      const advantageInput = screen.getByPlaceholderText('Основные преимущества товара');
      const formAdvantage = screen.getByTestId('form-advantage');
      const disadvantageInput = screen.getByPlaceholderText('Главные недостатки товара');
      const formDisadvantage = screen.getByTestId('form-disadvantage');
      const commentInput = screen.getByPlaceholderText('Поделитесь своим опытом покупки');
      const formComment = screen.getByTestId('form-comment');
      const sendButton = screen.getByTestId('send-button');

      expect(screen.queryByText(/Спасибо за отзыв/)).not.toBeInTheDocument();

      await userEvent.click(star4);
      await userEvent.type(nameInput, 'never');
      await userEvent.type(advantageInput, 'gonna');
      await userEvent.type(disadvantageInput, 'let');
      await userEvent.type(commentInput, 'you down');
      await userEvent.click(sendButton);

      expect(formRate).not.toBeInTheDocument();
      expect(formName).not.toBeInTheDocument();
      expect(formAdvantage).not.toBeInTheDocument();
      expect(formDisadvantage).not.toBeInTheDocument();
      expect(formComment).not.toBeInTheDocument();

      expect(screen.getByText(/Спасибо за отзыв/)).toBeInTheDocument();
      expect(screen.getByTestId('review-success-icon')).toBeInTheDocument();
      expect(screen.getByTestId('return-to-catalog-button')).toBeInTheDocument();
      expect(screen.getByTestId('close-icon')).toBeInTheDocument();
    });
  });

  describe('testing modal closing', () => {
    it('on cross button click', async () => {
      render(
        <Provider store={mockStore()}>
          <BrowserRouter>
            <ReviewModal isActive={isActive} setIsActive={setIsActive} setIsNeededUpdate={setIsNeededUpdate} />
          </BrowserRouter>
        </Provider>
      );

      expect(isActive).toBe(true);

      await userEvent.click(screen.getByLabelText('Закрыть попап'));

      expect(isActive).toBe(false);
    });

    it('on overlay click', async () => {
      render(
        <Provider store={mockStore()}>
          <BrowserRouter>
            <ReviewModal isActive={isActive} setIsActive={setIsActive} setIsNeededUpdate={setIsNeededUpdate} />
          </BrowserRouter>
        </Provider>
      );

      expect(isActive).toBe(true);

      await userEvent.click(screen.getByTestId('modal-overlay'));

      expect(isActive).toBe(false);
    });

    it('on Esc keydown', async () => {
      render(
        <Provider store={mockStore()}>
          <BrowserRouter>
            <ReviewModal isActive={isActive} setIsActive={setIsActive} setIsNeededUpdate={setIsNeededUpdate} />
          </BrowserRouter>
        </Provider>
      );

      expect(isActive).toBe(true);

      await userEvent.keyboard('[Escape]');

      expect(isActive).toBe(false);
    });
  });
});
