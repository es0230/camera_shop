/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import { SortOrder, SortType } from '../../../../const';
import CatalogSort from './catalog-sort';

describe('Testing Footer component', () => {
  it('should render correctly', () => {
    const { container } = render(
      <CatalogSort
        handleSortOrderButtonClick={jest.fn()}
        handleSortTypeButtonClick={jest.fn()}
        type={SortType.Price}
        order={SortOrder.Ascending}
      />);

    expect(container).toMatchSnapshot();
  });
});
