import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import MyHoliday from '../my-holiday';


interface Holiday {
    id: number;
    start_date: string;
    end_date: string;
    destination: string;
    price: number;
    picture: string;
    followers: number;
}


export default function MyHolidaysList(props: any) {
  const classes = useStyles();
  const { holidays } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
                {holidays.map((holiday: Holiday) => <MyHoliday key={holiday.id}  {...holiday} />)}
            </Grid>
        </Container>
      </main>
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

    disablePointerEvents: {
      pointerEvents: 'none',
    },
  }));
  
