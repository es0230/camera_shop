/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { makeFakeCamera } from '../../../../mocks/mocks';
import { Camera } from '../../../../types/camera';
import CatalogGallery from './catalog-gallery';
describe('Testing CatalogGallery component', () => {
  it('should render given camera cards correctly', () => {
    const mockCameras = Array.from({ length: 10 }, () => makeFakeCamera());

    render(
      <BrowserRouter>
        <CatalogGallery cameras={mockCameras} />
      </BrowserRouter>
    );

    expect(screen.getAllByTestId('camera-card').length).toBe(10);
  });
  it('should render a message when there is no camera cards', () => {
    const mockCameras: Camera[] = [];

    render(
      <BrowserRouter>
        <CatalogGallery cameras={mockCameras} />
      </BrowserRouter>
    );

    expect(screen.getByText('По вашему запросу ничего не найдено ;(')).toBeInTheDocument();
  });
});
