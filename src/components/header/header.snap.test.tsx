/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import Header from './header';

describe('Testing Footer component', () => {
  it('should render correctly', () => {
    const { container } = render(<Header />);

    expect(container).toMatchSnapshot();
  });
});
