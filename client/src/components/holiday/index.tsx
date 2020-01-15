import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


import { useState, useEffect } from 'react';
import axios from 'axios';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import IconButton from '@material-ui/core/IconButton';
import mainAxion from '../axios/mainAxios';
import { connect } from "react-redux";
import { deleteHolidayAction } from '../../redux/actions';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';


const updateFollowHolidayUrl = ('http://localhost:4000/updateFollowStatus')


export function Holiday(props: any) {
  const classes = useStyles();

  const { deleteHoliday } = props.reduxActions;


  const { id, destination, from, to, price, picture, followers, user_id } = props
    return (
    <React.Fragment>
    <Grid item key={`holiday_${id}`} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={`${picture}`}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {destination}
                    </Typography>
                    <Typography>
                     Price: {price}
                    </Typography>
                    <Typography>
                     Dates: {from} - {to}
                    </Typography>
                  </CardContent>
                  <CardActions>

                    <Button id={id} size="small" color="primary"  
                    onClick={()=>{  
                         console.log(id) 
                        //setHolidayId(id)
                        deleteHoliday(parseInt(id))
                        }}
                    > 
                    <DeleteForeverOutlinedIcon/>
                    {/* <DeleteForeverIcon/> */}
                    </Button>
                    <Button size="small" color="primary" >
                    <EditOutlinedIcon/>
                    {/* <EditIcon/> */}
                      
                    </Button>
                  </CardActions>
            </Card>
        </Grid>
    </React.Fragment>
  );
}

interface State {
  holidays: Array<object>;
}

const mapStateToProps = (state: State) => {
  let { holidays } = state;
      return { holidays };
  }   


const mapDispatchToProps = (dispatch: any) => {
  return {
      reduxActions: {
        deleteHoliday: (holidayId: number) => {
          dispatch(deleteHolidayAction(holidayId));
        }

      }
  };
};

export default connect(null, mapDispatchToProps) (Holiday);


  
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
