import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Container from "@material-ui/core/Container";
import useCustomForm from "../../hooks/useCustomForm";
import axios from "axios";
import { Link } from "react-router-dom";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import { initStateRegisterForm, Error, IRegisterProps } from "sharing-interfaces";
import { useStyles } from './style';

const registerUrl = "http://localhost:4000/register";



export default function Register(props: IRegisterProps) {
  const classes = useStyles();

  const initialState = {
    firstName: "",
    lastName: "",
    userName: "",
    password: ""
  };

  const [data, handleChange] = useCustomForm(initialState);
  const [validationsMessages, setvalidationsMessages] = useState([])  

  const handleRegister = async (data: initStateRegisterForm) => {
    try {
      const result = await axios.post(registerUrl, data);
      const { message, status } = result.data;
      const errMessage = result.data.errMessage ? result.data.errMessage.details[0].message : 0;    
      if (errMessage) {
        setvalidationsMessages(result.data.errMessage.details);
      } 
      if (message) alert(message);
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
        <form className={classes.form} noValidate >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}> 
              <TextField
              autoFocus
              variant="filled"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoComplete="fname"
              onChange={handleChange}
              helperText={validation(validationsMessages, "firstName")}
              error={validation(validationsMessages, "firstName").length > 0 ? true : false}
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
              helperText={validation(validationsMessages, "lastName")}
              error={validation(validationsMessages, "lastName").length > 0 ? true : false}
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
              helperText={validation(validationsMessages, "userName")}
              error={validation(validationsMessages, "userName").length > 0 ? true : false}
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
              helperText={validation(validationsMessages, "password")}
              error={validation(validationsMessages, "password").length > 0 ? true : false}
              />
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
              <Link to="/login" className={classes.link}>
                Already have an account? Log in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
        </React.Fragment>
  );
}

function validation(array: Array<any>, value: string) {
    const [inValid] = array.filter((error: Error) => error.message.includes(value))
      if (inValid) return inValid.message
      return [];
};