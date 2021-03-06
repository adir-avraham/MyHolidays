import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import { useDispatch } from "react-redux";
import { deleteHolidayAction } from "../../../redux/actions";
import { IDeleteDialogProps } from "sharing-interfaces";
import { DialogContentText, DialogContent } from "@material-ui/core";

const Transition = React.forwardRef<unknown, TransitionProps>(
  function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  }
);


export default function DeleteDialog(props: IDeleteDialogProps) {
  const { open, onClose, holidayId, destination } = props;
  const dispatch = useDispatch();

  return (
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        >
        <DialogTitle id="alert-dialog-slide-title">Delete Holiday</DialogTitle>
        <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {`Are you sure you want to delete the holiday to ${destination}?`}
         </DialogContentText>
         </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={onClose}>
            No
          </Button>
          <Button color="primary"
            onClick={() => {
              dispatch(deleteHolidayAction(holidayId));
              onClose();
            }}
            >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
  );
};