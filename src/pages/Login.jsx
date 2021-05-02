import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CardHeader from '@material-ui/core/CardHeader';
import {
  Card,
  CardContent,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Button,
  makeStyles
} from '@material-ui/core';
import { AccountCircle, Visibility, VisibilityOff } from '@material-ui/icons';
import { login } from '../Storage/Action/UserLogin';
import ErrorAlert from '../components/Flash/ErrorAlert';
import Load from '../components/Load';
import { Link, useHistory, useLocation } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  card: {
    border: '1px solid black',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    marginTop: theme.spacing(5)
  },
  link: {
    textDecoration: 'none',
    color: 'black'
  }
}));

const Login = () => {
  const [values, setValues] = useState({
    password: '',
    showPassword: false
  });
  const [LoadState, setLoadState] = useState(false);
  const location = useHistory();
  const from = useLocation();
  const [AlertData, setAlertData] = useState({
    open: from.state ? true : false,
    message: from.state ? 'Cuenta Creada' : '',
    AlertType: from.state ? 'success' : ''
  });
  const dispatch = useDispatch();
  const classes = useStyles();
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleCloseAlert = () => {
    setAlertData({
      ...AlertData,
      open: false
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoadState(true);
    let config = {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(FormData)
    };
    let data = await (
      await fetch('http://192.168.100.3:8081/sign-in', config)
    ).json();
    if (data.code !== 'error') {
      localStorage.setItem('user', JSON.stringify(data.code[0]));
      dispatch(login(data.code[0]));
      // setTimeout(() => {
      //   dispatch(logout());
      //   localStorage.removeItem('user');
      // }, 30*60*1000);
      setLoadState(false);
      location.push('/');
    } else {
      setAlertData({
        open: true,
        message: 'Datos Erroneos',
        AlertType: 'error'
      });
      setLoadState(false);
    }
  };
  const [FormData, setFormData] = useState({
    username: '',
    password: ''
  });
  return (
    <div className={classes.root}>
      <Container maxWidth="sm">
        <Grid
          container
          spacing={3}
          justify="center"
          alignItems="center"
          alignContent="center"
        >
          <Grid item lg={10}>
            <form onSubmit={handleSubmit}>
              <Card className={classes.card}>
                <CardHeader
                  title="Sign-in"
                  subheader="Ingrese sus credenciales"
                />
                <Divider />
                <CardContent>
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        label="Required"
                        placeholder="Username"
                        variant="outlined"
                        fullWidth
                        name="username"
                        onChange={e =>
                          setFormData({ ...FormData, username: e.target.value })
                        }
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AccountCircle />
                            </InputAdornment>
                          )
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        label="Required"
                        type={values.showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        variant="outlined"
                        fullWidth
                        onChange={e =>
                          setFormData({ ...FormData, password: e.target.value })
                        }
                        name="password"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                              >
                                {values.showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="outlined"
                        color="primary"
                        type="submit"
                        fullWidth
                      >
                        Submit
                      </Button>
                    </Grid>
                    <Grid container item xs={12} justify="space-between">
                      <Link className={classes.link} to={'/sign-up'}>
                        Create Account
                      </Link>
                      <Link className={classes.link}>Forgot password?</Link>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </form>
          </Grid>
        </Grid>
      </Container>
      <ErrorAlert
        open={AlertData.open}
        message={AlertData.message}
        onClose={handleCloseAlert}
        AlertType={AlertData.AlertType}
      />
      <Load open={LoadState} />
    </div>
  );
};

export default Login;
