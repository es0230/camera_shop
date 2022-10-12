/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { makeFakeCamera } from '../../../../mocks/mocks';
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
});
