import React from 'react';
import { render } from '@testing-library/react';
import HomePage from './HomePage';

jest.mock('./AppBar', () => (): string => 'MockAppBar');

describe('<HomePage />', () => {
  it('should render <AppBar />', () => {
    const { getByText } = render(<HomePage />);

    expect(getByText('MockAppBar')).toBeInTheDocument();
  });
});
