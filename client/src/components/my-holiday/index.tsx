import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useDispatch } from "react-redux";
import { updateFollowHolidayAction } from '../../redux/actions';
import { Holiday as IMyHolidayProps } from 'sharing-interfaces';
import { useStyles } from './style';
import { convertDateFormat } from 'utils';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import { IconButton } from '@material-ui/core';



export default function MyHoliday(props: IMyHolidayProps) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id, destination, start_date, end_date, price, picture, followers, user_id } = props;

    return (
    <Grid item key={`holiday_${id}`} xs={12} sm={6} md={4}>
      <Grow in={true} style={{ transformOrigin: '0 0 0' }} {... { timeout: 3000 } }>
        <Paper elevation={16}>
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
                     Start date: {convertDateFormat(start_date)} 
                    </Typography>
                    <Typography>
                     End date: {convertDateFormat(end_date)} 
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton size="medium" onClick={()=>{dispatch(updateFollowHolidayAction(id))}}> 
                    {!user_id ? <FavoriteIcon color="disabled"/> : <FavoriteIcon color="error"/>}
                    </IconButton>
                    {followers ? `${followers} likes` : "Be the first to like this"}
                  </CardActions>
            </Card>
            </Paper>
            </Grow>
        </Grid>
  );
};