/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import CatalogSort from './catalog-sort';

describe('Testing Footer component', () => {
  it('should render correctly', () => {
    const { container } = render(<CatalogSort />);

    expect(container).toMatchSnapshot();
  });
});
