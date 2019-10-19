import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

jest.mock('../LoginPage/Loadable', () => (): string => 'MockLoginPage');

jest.mock('../NotFoundPage/Loadable', () => (): string => 'MockNotFoundPage');

describe('<App />', () => {
  it('should able to navigate to /login', () => {
    const { getByText } = render(<Component initialEntries={['/login']} />);

    expect(getByText('MockLoginPage')).toBeInTheDocument();
  });

  it('should redirect to Not Found when access an unable route', () => {
    const { getByText } = render(<Component initialEntries={['/not-found']} />);

    expect(getByText('MockNotFoundPage')).toBeInTheDocument();
  });
});

type ComponentProps = {
  initialEntries: string[] | undefined;
};

function Component({ initialEntries }: ComponentProps): React.ReactElement {
  return (
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>
  );
}
