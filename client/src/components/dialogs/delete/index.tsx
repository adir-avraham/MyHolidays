import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";

import { connect } from "react-redux";
import { deleteHolidayAction } from "../../../redux/actions";

const Transition = React.forwardRef<unknown, TransitionProps>(
  function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  }
);


export function DeleteDialog(props: IDeleteDialogProps) {
  const { open, onClose, holidayId } = props;
  const { deleteHoliday } = props.reduxActions;
  
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        >
        <DialogTitle id="alert-dialog-slide-title">
          {"Are you sure do you want do delete this holiday?"}
        </DialogTitle>
        <DialogActions>
          <Button color="primary" onClick={onClose}>
            Cancel
          </Button>
          <Button color="primary"
            onClick={() => {
              deleteHoliday(holidayId);
              onClose();
            }}
            >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapDispatchToProps = (dispatch: any) => {
  console.log("dis", dispatch)
  return {
    reduxActions: {
      deleteHoliday: (holidayId: number) => {
        dispatch(deleteHolidayAction(holidayId));
      }
    }
  };
};

export default connect(null, mapDispatchToProps)(DeleteDialog);

interface IDeleteDialogProps {
  open: boolean;
  onClose: any;
  holidayId: number;
  reduxActions: ReduxAction;
}

interface ReduxAction {
  deleteHoliday: any;
}