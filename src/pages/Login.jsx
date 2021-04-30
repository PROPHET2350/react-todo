import React, { useState } from 'react';
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

const useStyles = makeStyles(theme => ({
  card: {
    border: '1px solid black',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    marginTop: theme.spacing(5)
  }
}));

const Login = () => {
  const [values, setValues] = useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false
  });
  const classes = useStyles();
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    let dat = {
      username: e.target[0].value,
      password: e.target[3].value
    };
    let config = {
      method: 'POST',
      cache: 'no-cache',
      header: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dat)
    };
    console.log(dat);
    let data = await fetch('http://192.168.100.3:8081/sign-in', config);
    console.log(data);
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
                <CardHeader title="Sign-in" subheader="loasd" />
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
                        color="secondary"
                        type="submit"
                        fullWidth
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </form>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Login;
