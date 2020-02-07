import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Holiday from '../holiday';
import { Holiday as IHoliday } from 'sharing-interfaces';
import MyHoliday from 'components/my-holiday';



export default function HolidaysList(props: IHolidaysListProps) {
  const classes = useStyles();
  const { holidays ,role } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
                {role === 'admin' ? holidays.map((holiday: IHoliday) => <Holiday key={holiday.id} {...holiday}/>) : 
                holidays.map((holiday: IHoliday) => <MyHoliday key={holiday.id} {...holiday}/>)}
            </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}


interface IHolidaysListProps {
  holidays: Array<IHoliday>;
  role: string;
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
    disablePointerEvents: {
      pointerEvents: 'none',
    },
}));
  
