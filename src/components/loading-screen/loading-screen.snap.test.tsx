/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import LoadingScreen from './loading-screen';

describe('Testing Footer component', () => {
  it('should render correctly', () => {
    const { container } = render(<LoadingScreen />);

    expect(container).toMatchSnapshot();
  });
});
