import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { useDispatch } from "react-redux";
import { updateFollowHolidayAction } from '../../redux/actions';
import { Holiday as IMyHolidayProps } from 'sharing-interfaces';
import { useStyles } from './style';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';



export default function MyHoliday(props: IMyHolidayProps) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id, destination, start_date, end_date, price, picture, followers, user_id } = props;

    return (
    <Grid item key={`holiday_${id}`} xs={12} sm={6} md={4}>
      <Grow in={true} style={{ transformOrigin: '0 0 0' }} {... { timeout: 3000 } }>
        <Paper elevation={15}>
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
                        dispatch(updateFollowHolidayAction(id))
                        }}
                    > 
                    {!user_id ? <FavoriteBorderIcon/> : <FavoriteIcon/>}
                    {followers}
                    </Button>
                  </CardActions>
            </Card>
            </Paper>
            </Grow>
        </Grid>
  );
};