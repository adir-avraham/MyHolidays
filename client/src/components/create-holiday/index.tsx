import React from 'react';
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
import { Link as Link1 } from 'react-router-dom';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import mainAxios from 'components/axios/mainAxios';
import Footer from 'components/footer';



interface initialState {
  destination: string | void; 
  start_date: string | void;
  end_date: string | void;
  price: number | void;
  picture: string | void;
}

export default function CreateHoliday(props: any ) {
  const classes = useStyles();

  const initialState = {
    destination: "",
    start_date: "",
    end_date: "",
    price: "",
    picture: "",
  }

  const [data, handleChange] = useCustomForm(initialState); 

  const handleCreateHoliday = async (data: initialState) => {
    const { destination, start_date, end_date, price, picture} = data;
    if (!destination || !start_date || !end_date || !price || !picture) return alert("please complete the form");
    try {
      const result = await mainAxios.post('/createHoliday', data);
      const { message, redirect } = result.data;
      const errMessage = result.data.errMessage ? result.data.errMessage.details[0].message : 0;
      if (errMessage) alert(errMessage);
      if (message) alert(message)
      if (redirect) props.history.push('/holidays');
      } catch  {
      console.log("some error from create holiday component");
    }
  }

  return (
    <React.Fragment>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AddCircleOutlineIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create a New Holiday 
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
          <Grid item xs={12}>
              <TextField
                variant="filled"
                required
                fullWidth
                id="destination"
                label="Destination"
                type="text"
                name="destination"
                autoComplete="c-destination"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="c-start_date"
                name="start_date"
                variant="filled"
                required
                fullWidth
                id="start_date"
                label="Start date"
                autoFocus
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="filled"
                required
                fullWidth
                id="end_date"
                label="End date"
                name="end_date"
                autoComplete="c-end_date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                required
                fullWidth
                id="price"
                label="Price"
                name="price"
                autoComplete="c-price"
                type="number"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                required
                fullWidth
                name="picture"
                label="Picture url"
                type="text"
                id="picture"
                autoComplete="c-picture"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={()=>{handleCreateHoliday(data)}}
          >
            Save 
          </Button>
        </form>
      </div>
    </Container>
    <Footer/>
    </React.Fragment>
  );
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
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    link: {
      textDecoration: 'none',
      color: theme.palette.primary.main,
  }
  }));