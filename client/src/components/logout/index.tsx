import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateUserNameConnectedAction } from 'redux/actions';



export function Logout(props: ILogoutProps) {
  
  const { updateUserNameConnected } = props.reduxActions;  
  const token = localStorage.getItem('token');
  
  if (token) {
      localStorage.removeItem('token');
      const firstName = 'Guest';
      const role = 'guest';
      updateUserNameConnected(firstName, role);
  }
  
  return (
     <Redirect to="/login" />
  );
}

const mapDispatchToProps = (dispatch: Function) => {
    return {
        reduxActions: {
          updateUserNameConnected: (firstName: string, role: string) => {
            dispatch(updateUserNameConnectedAction(firstName, role));
          }
        }
    };
};
  
export default connect(null, mapDispatchToProps) (Logout);

interface ILogoutProps {
  reduxActions: ReduxActions;
}

interface ReduxActions {
  updateUserNameConnected: Function;
}