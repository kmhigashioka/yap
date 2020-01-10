import React from 'react';
import { Helmet } from 'react-helmet-async';
import { makeStyles, Typography, TextField, Button } from '@material-ui/core';
import { Link, RouteComponentProps } from 'react-router-dom';
import RegisterPageContext from './RegisterPageContext';
import Welcome from '../LoginPage/Welcome';

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

  const handleSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    history.push('/');
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
            />
            <TextField
              name="emailAddress"
              label="Email Address"
              margin="dense"
              variant="outlined"
              fullWidth
            />
            <TextField
              name="username"
              label="Username"
              margin="dense"
              variant="outlined"
              fullWidth
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              margin="dense"
              variant="outlined"
              fullWidth
            />
            <TextField
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              margin="dense"
              variant="outlined"
              fullWidth
            />
            <Button
              className={classes.submitButton}
              color="primary"
              variant="contained"
              type="submit"
              fullWidth
            >
              Register
            </Button>
          </form>
          <Typography variant="body1">Already have an account?</Typography>
          <Link className={classes.link} to="/login">
            <Typography variant="body2">Login</Typography>
          </Link>
        </div>
      </RegisterPageContext.Provider>
    </div>
  );
};

export default RegisterPage;
