/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import Footer from '../footer/footer';

describe('Testing Footer component', () => {
  it('should render correctly', () => {
    const { container } = render(<Footer />);

    expect(container).toMatchSnapshot();
  });
});
