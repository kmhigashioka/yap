import React from 'react';
import { Helmet } from 'react-helmet-async';
import { makeStyles, Typography, TextField, Button, Snackbar } from '@material-ui/core';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useFormState } from 'react-use-form-state';
import RegisterPageContext from './RegisterPageContext';
import Welcome from '../LoginPage/Welcome';
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

const RegisterPage: React.FC<RouteComponentProps> = ({
  history,
}): React.ReactElement => {
  const classes = useStyles();
  const [{ errors, values }, { text, password }] = useFormState();
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    const body = JSON.stringify(values);
    const createUser = async (): Promise<void> => {
      setIsLoading(true);
      try {
        await request('http://localhost:9340/api/users', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body,
        });
      } catch (error) {
        setSnackbarMessage(error.message);
      }
      setIsLoading(false);
    };
    createUser();
    // history.push('/');
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
              name="fullName"
              label="Full Name"
              margin="dense"
              variant="outlined"
              fullWidth
              required
              {...text('fullName')}
            />
            <TextField
              name="emailAddress"
              label="Email Address"
              margin="dense"
              variant="outlined"
              fullWidth
              required
              {...text('email')}
            />
            <TextField
              name="username"
              label="Username"
              margin="dense"
              variant="outlined"
              fullWidth
              required
              {...text('userName')}
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              margin="dense"
              variant="outlined"
              fullWidth
              required
              {...password('password')}
            />
            <TextField
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              margin="dense"
              variant="outlined"
              fullWidth
              required
              helperText={errors.confirmPassword}
              error={!!errors.confirmPassword}
              {...password({
                name: 'confirmPassword',
                validate: (value, values) => {
                  if (value !== values.password) {
                    return 'Confirm password is not the same as password.';
                  }
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
