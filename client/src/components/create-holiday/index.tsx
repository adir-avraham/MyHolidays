import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import useCustomForm from '../../hooks/useCustomForm';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import mainAxios from 'components/axios/mainAxios';
import {useStyles} from './style';
import { ICreateHolidayProps, initialStateHolidayForm } from 'sharing-interfaces';
import { validation } from '../../utils';
import Paper from '@material-ui/core/Paper';
import AlertDialog from 'components/dialogs/create';



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
  const [validationsMessages, setvalidationsMessages] = useState([]);
  const [open, setOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const handleAlertOpen = () => { open ? setOpen(false) : setOpen(true)};

  const handleCreateHoliday = async (data: initialStateHolidayForm) => {
    try {
      const result = await mainAxios.post('/createHoliday', data);
      const { message, status, errMessage } = result.data;
      if (errMessage) setvalidationsMessages(errMessage);
      if (message && status) {
        setSuccessMessage(message)
        handleAlertOpen()
      } 
      } catch  {
      console.log("some error from create holiday component");
    };
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={16}>
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
                helperText={validation(validationsMessages, "destination")}
                error={validation(validationsMessages, "destination").length > 0 ? true : false}
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
                helperText={validation(validationsMessages, "start_date")}
                error={validation(validationsMessages, "start_date").length > 0 ? true : false}
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
                helperText={validation(validationsMessages, "end_date")}
                error={validation(validationsMessages, "end_date").length > 0 ? true : false}
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
                helperText={validation(validationsMessages, "price")}
                error={validation(validationsMessages, "price").length > 0 ? true : false}
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
                helperText={validation(validationsMessages, "picture")}
                error={validation(validationsMessages, "picture").length > 0 ? true : false}
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
          <AlertDialog
              open={open}
              onClose={handleAlertOpen}
              message={successMessage}
              history={props.history}
              route={'/holidays'}
              />
        </form>
      </div>
      </Paper>
    </Container>
  );
};