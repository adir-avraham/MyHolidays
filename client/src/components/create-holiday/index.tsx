import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';


import useCustomForm from '../../hooks/useCustomForm';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import mainAxios from 'components/axios/mainAxios';
import {useStyles} from './style';
import { ICreateHolidayProps, initialStateHolidayForm } from 'sharing-interfaces';


export default function CreateHoliday(props: ICreateHolidayProps) {
  const classes = useStyles();
  const initialState = {
    destination: "",
    start_date: "",
    end_date: "",
    price: "",
    picture: "",
  }

  const [data, handleChange] = useCustomForm(initialState); 

  const handleCreateHoliday = async (data: initialStateHolidayForm) => {
    const { destination, start_date, end_date, price, picture} = data;
    if (!destination || !start_date || !end_date || !price || !picture) return alert("please complete the form");
    try {
      const result = await mainAxios.post('/createHoliday', data);
      const { message, status } = result.data;
      const errMessage = result.data.errMessage ? result.data.errMessage.details[0].message : 0;
      if (errMessage) alert(errMessage);
      if (message) alert(message)
      if (status) props.history.push('/holidays');
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
                autoFocus
                color="secondary"
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
                color="secondary"
                autoComplete="c-start_date"
                name="start_date"
                variant="filled"
                required
                fullWidth
                id="start_date"
                label="Start date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                color="secondary"
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
                color="secondary"
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
                color="secondary"
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
                control={<Checkbox value="allowExtraEmails" color="secondary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={()=>{handleCreateHoliday(data)}}
          >
            Save 
          </Button>
        </form>
      </div>
    </Container>
    </React.Fragment>
  );
}