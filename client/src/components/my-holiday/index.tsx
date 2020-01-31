import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';



import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { connect } from "react-redux";
import { updateFollowHolidayAction } from '../../redux/actions';




export function MyHoliday(props: any) {
  const classes = useStyles();

  const { updateFollowHoliday } = props.reduxActions;


  const { id, destination, start_date, end_date, price, picture, followers, user_id } = props;

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
                     Price: {`$${price}`}
                    </Typography>
                    <Typography>
                     Start date: {start_date}
                    </Typography>
                    <Typography>
                     End date: {end_date}
                    </Typography>
                  </CardContent>
                  <CardActions>

                    <Button size="small" color="secondary"  
                    onClick={()=>{  
                        updateFollowHoliday(id)
                        }}
                    > 
                    {!user_id ? <FavoriteBorderIcon/> : <FavoriteIcon/>}
                    {followers}
                    {/* <FavoriteBorderIcon/> */}
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
        updateFollowHoliday: (holidayId: number) => {
          dispatch(updateFollowHolidayAction(holidayId));
        }

      }
  };
};

export default connect(null, mapDispatchToProps) (MyHoliday);


  
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
  }));
