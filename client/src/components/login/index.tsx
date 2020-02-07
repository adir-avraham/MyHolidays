import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import useCustomForm from '../../hooks/useCustomForm';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { updateUserNameConnectedAction } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import Alert from '@material-ui/lab/Alert';


interface InitialState {
  userName: string;
  password: string;
}

const loginUrl = ('http://localhost:4000/login');

export default function Login(props: ILoginProps) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const initialState: InitialState = {
    userName: "",
    password: "",
  }
  const [data, handleChange] = useCustomForm(initialState);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = async (data: InitialState) => {
    const result = await axios.post(loginUrl, data);
    const {message, token, status, user} = result.data;
    if (status) {
      const {first_name, role} = user[0]
      localStorage.setItem('token', token);
      if (role === "user") props.history.push('/my-holidays');
      if (role === "admin") props.history.push('/holidays');
      dispatch(updateUserNameConnectedAction(first_name, role));
    } else {
      setErrorMessage(message);
    }
  } 
  
  return (
    <React.Fragment>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon color="inherit"/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="filled"
            margin="normal"
            color="secondary"
            required
            fullWidth
            id="userName"
            label="User Name"
            name="userName"
            autoComplete="uname"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="filled"
            margin="normal"
            color="secondary"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
            {errorMessage ? <Alert severity="error">{errorMessage}</Alert>: <div></div>}
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={() => {handleLogin(data)}}
          >
            Log In
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
            <Link to="/register" className={classes.link}>
                {"Don't have an account? Register"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
    </React.Fragment>
  );
}


interface ILoginProps extends History {
  history: History;
}

interface History {
  push: Function;
}


const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
}
}));