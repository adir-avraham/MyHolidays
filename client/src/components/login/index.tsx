import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import useCustomForm from '../../hooks/useCustomForm';
import axios from 'axios';
import { Link as Link1 } from 'react-router-dom';
import { updateUserNameConnectedAction } from '../../redux/actions'
import { connect } from 'react-redux';
import Alert from '@material-ui/lab/Alert';
import Footer from 'components/footer';

interface InitialState {
  userName: string;
  password: string;
}

const loginUrl = ('http://localhost:4000/login');

export function Login(props: any) {
  const classes = useStyles();
  
  const initialState: InitialState = {
    userName: "",
    password: "",
  }
  const [data, handleChange] = useCustomForm(initialState);
  const { updateUserNameConnected } = props.reduxActions;
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = async (data: InitialState) => {
    const result = await axios.post(loginUrl, data);
    const {message, token, status, user} = result.data;
    if (status) {
     alert(message)
      const {first_name, role} = user[0]
      localStorage.setItem('token', token);
      if (role === "user") props.history.push('/my-holidays');
      if (role === "admin") props.history.push('/holidays');
      updateUserNameConnected(first_name, role)
    } else {
      //alert(message);
      setErrorMessage(message);
      //props.history.push('/login');
      //add set message here
    }
  } 
  
  return (
    <React.Fragment>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
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
            variant="outlined"
            margin="normal"
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
            color="primary"
            className={classes.submit}
            onClick={() => {handleLogin(data)}}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
            <Link1 to="/register" className={classes.link}>
               {/* variant="body2" */}
                {"Don't have an account? Register"}
       
              </Link1>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
        </React.Fragment>
  );
}


const mapDispatchToProps = (dispatch: any) => {
  return {
      reduxActions: {
        updateUserNameConnected: (firstName: string, role: string) => {
          dispatch(updateUserNameConnectedAction(firstName, role));
        }
      }
  };
};

export default connect(null, mapDispatchToProps) (Login);



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