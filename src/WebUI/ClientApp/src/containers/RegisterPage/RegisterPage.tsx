import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  makeStyles,
  Typography,
  TextField,
  Button,
  Snackbar,
} from '@material-ui/core';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useFormState } from 'react-use-form-state';
import RegisterPageContext from './RegisterPageContext';
import Welcome from '../LoginPage/Welcome';
import request, { TokenResponse } from '../../utils/request';
import auth from '../../utils/auth';

const useStyles = makeStyles((theme) => ({
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

const RegisterPage: React.FC<RouteComponentProps> = ({
  history,
}): React.ReactElement => {
  const classes = useStyles();
  const [{ errors, values }, { text, password }] = useFormState();
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault();
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
      const body = JSON.stringify(values);
      setIsLoading(true);
      try {
        await request('/api/users', {
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
      }
      setIsLoading(false);
    };
    createUser();
  };

  const handleCloseSnackbar = (): void => {
    setSnackbarMessage('');
  };

  return (
    <div className={classes.loginWrapper}>
      <RegisterPageContext.Provider value={{}}>
        <Helmet>
          <title>Register</title>
          <meta name="description" content="" />
        </Helmet>
        <Welcome />
        <div className={classes.formContainer}>
          <Typography variant="h6">CREATE AN ACCOUNT</Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              label="Full Name"
              margin="dense"
              variant="outlined"
              fullWidth
              required
              placeholder="Full Name"
              {...text('fullName')}
            />
            <TextField
              label="Email Address"
              margin="dense"
              variant="outlined"
              fullWidth
              required
              placeholder="Email Address"
              {...text('email')}
            />
            <TextField
              label="Username"
              margin="dense"
              variant="outlined"
              fullWidth
              required
              placeholder="Username"
              {...text('userName')}
            />
            <TextField
              label="Password"
              margin="dense"
              variant="outlined"
              fullWidth
              required
              placeholder="Password"
              {...password('password')}
            />
            <TextField
              label="Confirm Password"
              margin="dense"
              variant="outlined"
              fullWidth
              required
              placeholder="Confirm Password"
              helperText={errors.confirmPassword}
              error={!!errors.confirmPassword}
              {...password({
                name: 'confirmPassword',
                validate: (value, formvalues) => {
                  if (value !== formvalues.password) {
                    return 'Confirm password is not the same as password.';
                  }
                  return null;
                },
                validateOnBlur: true,
              })}
            />
            <Button
              className={classes.submitButton}
              color="primary"
              variant="contained"
              type="submit"
              fullWidth
              disabled={isLoading}
            >
              Register
            </Button>
          </form>
          <Typography variant="body1">Already have an account?</Typography>
          <Link className={classes.link} to="/login">
            <Typography variant="body2">Login</Typography>
          </Link>
        </div>
        <Snackbar
          autoHideDuration={6000}
          open={snackbarMessage !== ''}
          message={snackbarMessage}
          onClose={handleCloseSnackbar}
        />
      </RegisterPageContext.Provider>
    </div>
  );
};

export default RegisterPage;
