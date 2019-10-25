import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter as Router, Route } from 'react-router';
import RegisterPage from './RegisterPage';

describe('<RegisterPage />', () => {
  it('should navigate to /login', () => {
    const { getByText } = render(<Component />);

    const loginLink = getByText(/Login/);
    fireEvent.click(loginLink);

    const LoginComponentText = getByText(/Login Component/);
    expect(LoginComponentText).toBeInTheDocument();
  });

  it('should navigate to /', () => {
    const { getByText } = render(<Component />);

    const registerButton = getByText(/Register/);
    fireEvent.submit(registerButton);

    expect(registerButton).not.toBeInTheDocument();
  });
});

function Component(): React.ReactElement {
  return (
    <Router initialEntries={['/register']}>
      <Route
        exact
        path="/"
        component={(): React.ReactElement => <div>Home Component</div>}
      />
      <Route path="/register" component={RegisterPage} />
      <Route
        path="/login"
        component={(): React.ReactElement => <div>Login Component</div>}
      />
    </Router>
  );
}
