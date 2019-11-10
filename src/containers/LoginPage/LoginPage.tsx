import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Typography,
  makeStyles,
  TextField,
  Button,
  Snackbar,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useFormState } from 'react-use-form-state';
import LoginPageContext from './LoginPageContext';
import { LoginPageProps } from './types';
import Welcome from './Welcome';
import request from '../../utils/request';

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

const LoginPage: React.FC<LoginPageProps> = ({
  history,
}): React.ReactElement => {
  const classes = useStyles();
  const [formState, { text, password }] = useFormState();
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

  const handleSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    const body = `grant_type=client_credentials&client_id=${formState.values.username}&client_secret=${formState.values.password}`;
    request('https://demo.identityserver.io/connect/token', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'post',
      body,
    })
      .then(() => history.push('/'))
      .catch(() => setSnackbarMessage('Invalid username or password.'));
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
              margin="dense"
              variant="outlined"
              fullWidth
              {...text('username')}
            />
            <TextField
              name="password"
              label="Password"
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
