import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Holiday from '../holiday';
import { Holiday as IHoliday } from 'sharing-interfaces';
import MyHoliday from 'components/my-holiday';
import { useStyles } from './style';
import { IHolidaysListProps } from '../../sharing-interfaces';


export default function HolidaysList(props: IHolidaysListProps) {
  const classes = useStyles();
  const { holidays ,role } = props;

  return (
        <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
                {role === 'admin' ? holidays.map((holiday: IHoliday) => <Holiday key={holiday.id} {...holiday}/>) : 
                holidays.map((holiday: IHoliday) => <MyHoliday key={holiday.id} {...holiday}/>)}
            </Grid>
        </Container>
  );
};