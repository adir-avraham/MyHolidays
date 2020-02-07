import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import useCustomForm from '../../../hooks/useCustomForm';
import { useDispatch, useSelector } from "react-redux";
import { updateHolidayAction, resetErrorMessageValidationAction } from "../../../redux/actions";
import { State, IEditDialogProps } from "sharing-interfaces";
import Alert from '@material-ui/lab/Alert';


export default function EditDialog(props: IEditDialogProps) {
  const { open, onClose, holidayId, destination, start_date, end_date, price, picture } = props;
  const dispatch = useDispatch();
  const message = useSelector((state: State) => state.message);
  const errMessage = useSelector((state: State) => state.errMessage);
  const status = useSelector((state: State) => state.status);
  const initialState = {
    id: holidayId,
    destination: destination,
    start_date: start_date,
    end_date: end_date,
    price: price,
    picture: picture,
  }
  const [data, handleChange] = useCustomForm(initialState); 
  
  
  return (
      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit holiday</DialogTitle>
        <DialogContent>
          {errMessage ? <Alert severity="error">{errMessage}</Alert> : null} 
          <TextField
            autoFocus
            margin="dense"
            id="destination"
            label="Destination"
            name="destination"
            type="text"
            fullWidth
            value={data.destination}
            onChange={handleChange}
            />
          <TextField
            autoFocus
            margin="dense"
            id="start_date"
            label="Start date"
            name="start_date"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={data.start_date}
            onChange={handleChange}
            />
          <TextField
            autoFocus
            margin="dense"
            id="end_date"
            label="End date"
            name="end_date"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={data.end_date}
            onChange={handleChange}
            />
          <TextField
            autoFocus
            margin="dense"
            id="price"
            label="Price"
            name="price"
            type="number"
            fullWidth
            value={data.price}
            onChange={handleChange}
            />
          <TextField
            autoFocus
            margin="dense"
            id="picture"
            label="Picture url"
            name="picture"
            type="text"
            fullWidth
            value={data.picture}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{
            dispatch(resetErrorMessageValidationAction(""))
            onClose()
            }} color="primary">
            Cancel
          </Button>
          <Button color="primary"
           onMouseDown={()=>{dispatch(updateHolidayAction(data))}}
           onMouseUp={()=>{if (status) onClose()}}
          >
          Save
          </Button>
        </DialogActions>
      </Dialog>
  );
};