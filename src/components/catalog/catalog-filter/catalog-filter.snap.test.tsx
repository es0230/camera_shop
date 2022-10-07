/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import CatalogFilter from './catalog-filter';

describe('Testing Footer component', () => {
  it('should render correctly', () => {
    const { container } = render(<CatalogFilter />);

    expect(container).toMatchSnapshot();
  });
});
