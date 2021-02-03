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
import useMediaQuery from '@material-ui/core/useMediaQuery';
import LoginPageContext from './LoginPageContext';
import Welcome from './Welcome';
import request, { TokenResponse } from '../../utils/request';
import auth from '../../utils/auth';

const useStyles = makeStyles((theme) => ({
  loginWrapper: {
    display: 'flex',
    height: '100%',
  },
  loginWrapperXsToMd: {
    flexDirection: 'column',
    alignItems: 'center',
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
  formContainerXsToMd: {
    maxWidth: '400px',
    width: '100%',
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
  const xsToMdDeviceMatches = useMediaQuery('(max-width: 960px)');

  React.useEffect(() => {
    if (successfullyLoggedIn) {
      history.push('/');
    }
  }, [history, successfullyLoggedIn]);

  const handleSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    setIsLoading(true);
    const body = `grant_type=password&username=${formState.values.username}&password=${formState.values.password}&client_id=mvc`;
    request<TokenResponse>('/connect/token', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'post',
      body,
    })
      .then((data) => {
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

  const handleClickSkipAsGuest = (): void => {
    const uuid = uuidv4();
    const values = {
      userName: `guest${uuid}@example.com`,
      password: uuid,
    };
    const loginUser = async (): Promise<void> => {
      try {
        const { userName, password: userpassword } = values;
        const body = `grant_type=password&client_id=mvc&username=${userName}&password=${userpassword}`;
        const data = await request<TokenResponse>('/connect/token', {
          method: 'post',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body,
        });
        localStorage.setItem('refresh_token', data.refresh_token);
        auth.accessToken = data.access_token;
        history.push('/');
      } catch (error) {
        const errorResponse = await error.response.json();
        setSnackbarMessage(errorResponse.message);
      }
    };
    const createUser = async (): Promise<void> => {
      const body = JSON.stringify({
        ...values,
        fullName: 'Guest',
        email: values.userName,
      });
      setIsLoading(true);
      try {
        await request('/api/guests', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body,
        });
        loginUser();
      } catch (error) {
        const errorResponse = await error.response.json();
        setSnackbarMessage(errorResponse.message);
      } finally {
        setIsLoading(false);
      }
    };
    createUser();
  };

  return (
    <div
      className={`${classes.loginWrapper} ${
        xsToMdDeviceMatches ? classes.loginWrapperXsToMd : ''
      }`}
    >
      <LoginPageContext.Provider value={{}}>
        <Helmet>
          <title>Login</title>
          <meta name="description" content="" />
        </Helmet>
        <Welcome xsToMdDeviceMatches={xsToMdDeviceMatches} />
        <div
          className={`${classes.formContainer} ${
            xsToMdDeviceMatches ? classes.formContainerXsToMd : ''
          }`}
        >
          <Typography variant="h6">LOGIN TO YOUR ACCOUNT</Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              label="Username"
              placeholder="Username"
              margin="dense"
              variant="outlined"
              fullWidth
              {...text('username')}
            />
            <TextField
              label="Password"
              placeholder="Password"
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
            <Button
              color="default"
              variant="contained"
              type="button"
              fullWidth
              onClick={handleClickSkipAsGuest}
              disabled={isLoading}
            >
              Skip as Guest
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

function uuidv4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function s(c) {
    // eslint-disable-next-line no-bitwise
    const r = (Math.random() * 16) | 0;
    // eslint-disable-next-line no-bitwise
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
