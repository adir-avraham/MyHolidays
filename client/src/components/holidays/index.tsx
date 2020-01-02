import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';


import { useState, useEffect } from 'react';
import axios from 'axios';
import HolidaysList from '../holidays-list'
import mainAxios from '../axios/mainAxios';

const getHolidaysUrl = ('http://localhost:4000/getHolidays');



export default function Holidays() {
  const classes = useStyles();

  // const initialState = {
  //     cards: ""
  // }

  const [holidays, setHolidays] = useState([]);
  

  useEffect(()=>{

    const initReq = async () =>{
        try{
            const result = await axios.get(getHolidaysUrl);
            const {data} = result;
            setHolidays(data);
        } catch {
            console.log("some error");
        }
    }
    initReq();

  },[])

  if (holidays.length < 1) return <div>loading..</div>
  return (
    <React.Fragment>
      <CssBaseline />
      <HolidaysList holidays={holidays}/>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
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
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
  }));
  