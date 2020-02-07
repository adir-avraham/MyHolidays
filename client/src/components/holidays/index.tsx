import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';


import { useEffect } from 'react';
import HolidaysList from '../holidays-list'
import { useDispatch, useSelector } from "react-redux";
import { getHolidaysAction, getHolidaysPendingAction } from '../../redux/actions';
import { CSSTransitionGroup } from 'react-transition-group'
import LinearIndeterminate from 'components/loader';
import Footer from 'components/footer';
import { State } from 'sharing-interfaces';



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
}


  
const useStyles = makeStyles(theme => ({
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
    },
  },
})); 