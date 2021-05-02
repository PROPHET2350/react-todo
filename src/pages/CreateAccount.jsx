import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  makeStyles
} from '@material-ui/core';
import { AccountCircle, Visibility, VisibilityOff } from '@material-ui/icons';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ErrorAlert from '../components/Flash/ErrorAlert';
import Load from '../components/Load';
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

function CreateAccount() {
  const [FormData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [values, setValues] = useState({
    password: '',
    showPassword: false
  });
  const [AlertData, setAlertData] = useState({
    open: false,
    message: '',
    AlertType: ''
  });
  const [LoadState, setLoadState] = useState(false);
  const location = useHistory();
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
    try {
      let config = {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(FormData)
      };
      let res = await (
        await fetch('http://192.168.100.3:8081/sign-up', config)
      ).json();
      if (res.code === 'success') {
        setLoadState(false);
        location.push('/sign-in', 'AccountCreated');
      } else {
        setAlertData({
          open: true,
          message: 'Datos Erroneos',
          AlertType: 'error'
        });
        setAlertData({
          open: true,
          message: 'Usuario creado',
          AlertType: 'success'
        });
        setLoadState(false);
      }
    } catch (error) {
      setAlertData({
        open: true,
        message: 'Datos Erroneos',
        AlertType: 'error'
      });
      setLoadState(false);
    }
  };
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
                <CardHeader title="Sign-up" subheader="Create your account" />
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
                      <Link className={classes.link} to={'/sign-in'}>
                        Go back
                      </Link>
                      <Link className={classes.link} to={'/'}>
                        Go Home
                      </Link>
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
}

export default CreateAccount;
