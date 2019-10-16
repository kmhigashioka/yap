import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter as Router, Route } from 'react-router';
import LoginPage from './LoginPage';

describe('<LoginPage />', () => {
  it('should navigate to /', () => {
    const { getByText, debug } = render(<Component />);

    const loginButton = getByText(/Login/);
    fireEvent.click(loginButton);
    debug();
    expect(loginButton).not.toBeInTheDocument();
  });

  it('should navigate to /register', () => {
    const { getByText } = render(<Component />);

    const registerLink = getByText(/Create Account/);
    fireEvent.click(registerLink);

    expect(registerLink).not.toBeInTheDocument();
  });
});

function Component(): React.ReactElement {
  return (
    <Router initialEntries={['/login']}>
      <Route
        exact
        path="/"
        component={(): React.ReactElement => <div>Home Component</div>}
      />
      <Route path="/login" component={LoginPage} />
      <Route
        path="/register"
        component={(): React.ReactElement => <div>Register Component</div>}
      />
    </Router>
  );
}
