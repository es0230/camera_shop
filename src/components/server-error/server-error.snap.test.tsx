/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import ServerError from './server-error';

describe('testing ServerError component', () => {
  it('should render correctly', () => {
    const { container } = render(<ServerError />);

    expect(container).toMatchSnapshot();
  });
});
