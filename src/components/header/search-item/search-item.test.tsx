/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { makeFakeCamera } from '../../../mocks/mocks';
import SearchItem from './search-item';

const fakeCamera = makeFakeCamera();

describe('Testing Search Item component', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <SearchItem camera={fakeCamera} onSearchItemClick={jest.fn()} />
      </BrowserRouter>
    );

    expect(screen.getByText(fakeCamera.name)).toBeInTheDocument();
  });
});
