import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ExpensesPage from './ExpensesPage';

describe('<ExpensesPage />', () => {
  it('should display selected expense', () => {
    const { getAllByText, getByPlaceholderText } = render(<ExpensesPage />);
    const expense = getAllByText('Charges')[0];
    fireEvent.click(expense);

    const amountTextField = getByPlaceholderText('Amount');
    const descriptionTextField = getByPlaceholderText('Description');
    const dateTextField = getByPlaceholderText('Date');
    expect(amountTextField).toBeInTheDocument();
    expect(descriptionTextField).toBeInTheDocument();
    expect(dateTextField).toBeInTheDocument();
  });
});
