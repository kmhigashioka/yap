import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Typography,
  makeStyles,
  TextField,
  Button,
  Snackbar,
} from '@material-ui/core';
import { useFormState } from 'react-use-form-state';
import { Link, RouteComponentProps } from 'react-router-dom';
import LoginPageContext from './LoginPageContext';
import Welcome from './Welcome';
import request, { TokenResponse } from '../../utils/request';
import auth from '../../utils/auth';

const useStyles = makeStyles(theme => ({
  loginWrapper: {
    display: 'flex',
    height: '100%',
  },
  formContainer: {
    alignItems: 'center',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '50px',
    width: '400px',
  },
  form: {
    margin: '40px 0',
  },
  submitButton: {
    margin: '20px 0',
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',

    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

const LoginPage: React.FC<RouteComponentProps> = ({
  history,
}): React.ReactElement => {
  const classes = useStyles();
  const [formState, { text, password }] = useFormState();
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [successfullyLoggedIn, setSuccessfullyLoggedIn] = React.useState(false);

  React.useEffect(() => {
    if (successfullyLoggedIn) {
      history.push('/');
    }
  }, [successfullyLoggedIn]);

  const handleSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    setIsLoading(true);
    const body = `grant_type=password&username=${formState.values.username}&password=${formState.values.password}&client_id=mvc`;
    request<TokenResponse>('http://localhost:9340/connect/token', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'post',
      body,
    })
      .then(data => {
        setSuccessfullyLoggedIn(true);
        auth.accessToken = data.access_token;
        localStorage.setItem('refresh_token', data.refresh_token);
      })
      .catch(() => setSnackbarMessage('Invalid username or password.'))
      .finally(() => setIsLoading(false));
  };

  const handleCloseSnackbar = (): void => {
    setSnackbarMessage('');
  };

  return (
    <div className={classes.loginWrapper}>
      <LoginPageContext.Provider value={{}}>
        <Helmet>
          <title>Login</title>
          <meta name="description" content="" />
        </Helmet>
        <Welcome />
        <div className={classes.formContainer}>
          <Typography variant="h6">LOGIN TO YOUR ACCOUNT</Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              name="username"
              label="Username"
              placeholder="Username"
              margin="dense"
              variant="outlined"
              fullWidth
              {...text('username')}
            />
            <TextField
              name="password"
              label="Password"
              placeholder="Password"
              type="password"
              margin="dense"
              variant="outlined"
              fullWidth
              {...password('password')}
            />
            <Button
              className={classes.submitButton}
              color="primary"
              variant="contained"
              type="submit"
              fullWidth
              disabled={isLoading}
            >
              Login
            </Button>
          </form>
          <Typography variant="body1">Don&#39;t have an account?</Typography>
          <Link className={classes.link} to="/register">
            <Typography variant="body2">Create Account</Typography>
          </Link>
        </div>
        <Snackbar
          autoHideDuration={6000}
          message={snackbarMessage}
          open={snackbarMessage !== ''}
          onClose={handleCloseSnackbar}
        />
      </LoginPageContext.Provider>
    </div>
  );
};

export default LoginPage;
