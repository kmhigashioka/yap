import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import HomePage from './HomePage';

jest.mock('./AppBar', () => (): string => 'MockAppBar');
jest.mock('../ExpensesPage/Loadable', () => (): string => 'MockExpensesPage');

describe('<HomePage />', () => {
  it('should render <AppBar />', () => {
    const { getByText } = render(<Component initialEntries={['/']} />);

    expect(getByText('MockAppBar')).toBeInTheDocument();
  });

  it('should render <ExpensesPage />', () => {
    const { getByText } = render(<Component initialEntries={['/']} />);

    expect(getByText('MockExpensesPage')).toBeInTheDocument();
  });
});

type ComponentProps = {
  initialEntries: string[] | undefined;
};

function Component({ initialEntries }: ComponentProps): React.ReactElement {
  return (
    <MemoryRouter initialEntries={initialEntries}>
      <HomePage />
    </MemoryRouter>
  );
}
