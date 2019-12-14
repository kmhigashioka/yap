import React from 'react';
import { render } from '@testing-library/react';
import CategoryPage from './CategoryPage';

describe('<CategoryPage />', () => {
  it('should have CategoryPage text', () => {
    const { getByText } = render(<CategoryPage />);

    expect(getByText('CategoryPage')).toBeInTheDocument();
  });
});
