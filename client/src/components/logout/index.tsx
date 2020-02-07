import React from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUserNameConnectedAction } from 'redux/actions';



export default function Logout() {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token');
  if (token) {
      localStorage.removeItem('token');
      const firstName = 'Guest';
      const role = 'guest';
      dispatch(updateUserNameConnectedAction(firstName, role));
  }
  
  return (
     <Redirect to="/login" />
  );
}