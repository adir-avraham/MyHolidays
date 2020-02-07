import React, { useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';


import HolidaysList from '../holidays-list';
import { useDispatch, useSelector } from "react-redux";
import { getHolidaysAction, getHolidaysPendingAction } from '../../redux/actions';
import { CSSTransitionGroup } from 'react-transition-group';
import LinearIndeterminate from 'components/loader';
import Footer from 'components/footer';
import { State } from 'sharing-interfaces';
import { useStyles } from './style';


export default function Holidays() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const holidays = useSelector((state: State) => state.holidays);
  const holidaysLoading = useSelector((state: State) => state.holidaysLoading);
  const role = useSelector((state: State) => state.userNameConnected.role);

  useEffect(()=>{
    const initReq = () =>{
      dispatch(getHolidaysPendingAction());
      dispatch(getHolidaysAction());
    }
    initReq();
  },[])


  if (holidaysLoading) return (
    <div className={classes.root}>
    <LinearIndeterminate/>
    </div>)
      if (!Array.isArray(holidays)) return (<div className={classes.root}>
        No data available...
        </div>)  
  return (
    <React.Fragment>
      <CssBaseline />
      <CSSTransitionGroup
      transitionName="example"
      transitionAppear={true}
      transitionAppearTimeout={900}
      transitionEnter={false}
      transitionLeave={false}>
      <HolidaysList holidays={holidays} role={role}/>
      </CSSTransitionGroup>
    <Footer/>
    </React.Fragment>
  );
};