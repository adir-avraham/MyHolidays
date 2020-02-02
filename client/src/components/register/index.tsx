import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import useCustomForm from "../../hooks/useCustomForm";
import axios from "axios";
import { Link as Link1 } from "react-router-dom";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import Alert from "@material-ui/lab/Alert";


const registerUrl = "http://localhost:4000/register";

interface initialState {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
}

export default function Register(props: any) {
  const classes = useStyles();

  const initialState = {
    firstName: "",
    lastName: "",
    userName: "",
    password: ""
  };

  const [data, handleChange] = useCustomForm(initialState);
  const [errMessage, setErrMessage] = useState("")  


  const handleRegister = async (data: initialState) => {
    const { firstName, lastName, userName, password } = data;
    if (!firstName || !lastName || !userName || !password)
    return setErrMessage("please complete the form");
    
    try {
      const result = await axios.post(registerUrl, data);
      const { message, status } = result.data;
      const errMessage = result.data.errMessage ? result.data.errMessage.details[0].message : 0;
      if (errMessage) setErrMessage(errMessage)
      if (message) alert(message)
      if (status) props.history.push('/login');
    } catch {
      console.log("some error register (client)");
    }
  };

  return (
    
    <React.Fragment>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonAddOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}> 
              <TextField
                autoComplete="fname"
                color="secondary"
                name="firstName"
                variant="filled"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="filled"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                required
                fullWidth
                id="userName"
                label="User Name"
                name="userName"
                autoComplete="uname"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
            {errMessage ? <Alert severity="error">{errMessage}</Alert> : null}
            </Grid>
          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={() => {
              handleRegister(data);
            }}
          >
            Register
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link1 to="/login" className={classes.link}>
                Already have an account? Log in
              </Link1>
            </Grid>
          </Grid>
        </form>
      </div>

    </Container>
        </React.Fragment>
  );
}


const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  }
}));
