import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';


import { useState, useEffect } from 'react';
import HolidaysList from '../holidays-list'
import { connect } from "react-redux";
import { getHolidaysAction, getHolidaysPendingAction } from '../../redux/actions';

import { CSSTransitionGroup } from 'react-transition-group'
import LinearIndeterminate from 'components/loader';
import Footer from 'components/footer';



export function Holidays(props: any) {
  const classes = useStyles();

  const { getHolidays, getHolidaysPending } = props.reduxActions;

  useEffect(()=>{

    const initReq = () =>{
      getHolidaysPending()
      getHolidays()
    }
    initReq();

  },[])

  const { holidays, holidaysLoading } = props;

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
      <HolidaysList holidays={holidays}/>
      </CSSTransitionGroup>
    <Footer/>
    </React.Fragment>
  );
}

interface State {
  holidays: Array<object>;
  holidaysLoading: boolean;
}

const mapStateToProps = (state: State) => {
  let { holidays, holidaysLoading } = state;
      return { holidays, holidaysLoading };
  }   


const mapDispatchToProps = (dispatch: any) => {
  return {
      reduxActions: {
        getHolidays: () => {
          dispatch(getHolidaysAction());
        },
        getHolidaysPending: () => {
          dispatch(getHolidaysPendingAction());
        }
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps) (Holidays);



  
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


  