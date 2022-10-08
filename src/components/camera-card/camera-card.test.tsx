/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { makeFakeCamera } from '../../mocks/mocks';
import CameraCard from './camera-card';

describe('Testing CameraCard component', () => {
  const mockCamera = makeFakeCamera();

  it('should render camera card correctly', () => {
    render(
      <BrowserRouter>
        <CameraCard camera={mockCamera} />
      </BrowserRouter>
    );

    expect(screen.getByText(mockCamera.name)).toBeInTheDocument();
    expect(screen.getByText(mockCamera.rating)).toBeInTheDocument();
    expect(screen.getByText(mockCamera.reviewCount)).toBeInTheDocument();
    expect(screen.getByText(mockCamera.price)).toBeInTheDocument();
    expect(screen.getByText('Купить')).toBeInTheDocument();
    expect(screen.getByText('Подробнее')).toBeInTheDocument();
  });
});
