import React from 'react';
import { render } from '@testing-library/react';
import ExpensesPage from './ExpensesPage';

describe('<ExpensesPage />', () => {
  it('should have ExpensesPage text', () => {
    const { getByText } = render(<ExpensesPage />);

    expect(getByText('ExpensesPage')).toBeInTheDocument();
  });
});
