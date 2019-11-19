import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Typography, makeStyles, TextField, Button } from '@material-ui/core';
import { Link, RouteComponentProps } from 'react-router-dom';
import LoginPageContext from './LoginPageContext';
import Welcome from './Welcome';

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

  const handleSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    history.push('/');
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
            />
            <TextField
              name="password"
              label="Password"
              placeholder="Password"
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
              Login
            </Button>
          </form>
          <Typography variant="body1">Don&#39;t have an account?</Typography>
          <Link className={classes.link} to="/register">
            <Typography variant="body2">Create Account</Typography>
          </Link>
        </div>
      </LoginPageContext.Provider>
    </div>
  );
};

export default LoginPage;
