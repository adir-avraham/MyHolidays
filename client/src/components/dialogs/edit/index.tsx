import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import useCustomForm from '../../../hooks/useCustomForm';
import { connect } from "react-redux";
import { updateHolidayAction } from "../../../redux/actions";
import { Holiday, State } from "sharing-interfaces";

interface IEditDialogProps {
  open: any;
  onClose: any;
  holidayId: string;
  destination: string;
  from: Date;
  to: Date;
  price: number;
  picture: string;
  history?: any;
  reduxActions?: any; 
  updateHoliday?: Holiday;
  holidays?: Array<object>;
  message?: string;
  errMessage?: string;
  status?: boolean;
}


export function EditDialog(props: IEditDialogProps) {
  const { open, onClose, holidayId, destination, from, to, price, picture, holidays, message ,errMessage, status } = props;
  const { updateHoliday } = props.reduxActions;
    
  const initialState = {
    id: holidayId,
    destination: destination,
    from: from,
    to: to,
    price: price,
    picture: picture,
  }

  const [data, handleChange] = useCustomForm(initialState); 

  if (status) onClose();

  return (
    <div>
      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit holiday</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {errMessage} {message}
          </DialogContentText>
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
            id="from"
            label="From"
            name="from"
            type="date"
            fullWidth
            InputLabelProps={{
                shrink: true,
              }}
            value={data.from}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="to"
            label="To"
            name="to"
            type="date"
            fullWidth
            InputLabelProps={{
                shrink: true,
              }}
            value={data.to}
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
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button color="primary"
           onClick={()=>{
              console.log("data to func", data);
              updateHoliday(data);
          }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state: State) => {
  let { message ,errMessage, status } = state;
  return { message ,errMessage, status };
}   

const mapDispatchToProps = (dispatch: any) => {
    return {
      reduxActions: {
        updateHoliday: (holiday: Holiday) => {
          dispatch(updateHolidayAction(holiday));
      }
    }
  };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(EditDialog);