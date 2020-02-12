import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useState } from "react";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import DeleteDialog from "components/dialogs/delete";
import EditDialog from "components/dialogs/edit";
import moment from 'moment';
import { Holiday as IHolidayProps } from "sharing-interfaces";
import { useStyles } from './style';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';



export default function Holiday(props: IHolidayProps) {
  const classes = useStyles();
  const { id, destination, start_date, end_date, price, picture } = props;
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [deleteIcon, setDeleteIcon] = useState(false);
  const [editIcon, setEditIcon] = useState(false); 
  
  const handleClickOpen = () => { open ? setOpen(false) : setOpen(true)};
  const handleClickOpenEdit = () => { openEdit ? setOpenEdit(false) : setOpenEdit(true)};

  return (
      <Grid item key={`holiday_${id}`} xs={12} sm={6} md={4}>
      <Grow in={true} style={{ transformOrigin: '0 0 0' }} {... { timeout: 3000 } }>
        <Paper elevation={15}>
        <Card className={classes.card}>
          <CardMedia className={classes.cardMedia} image={`${picture}`} title="Image title"/>
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
              {destination}
            </Typography>
            <Typography>Price: {`$${price}`}</Typography>
            <Typography>
              Start date: {new Date(start_date).toLocaleDateString('en-GB')} 
            </Typography>
            <Typography>
              End date: {moment(end_date).format("DD/MM/YYYY")}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="secondary" variant="text"
              onClick={()=>{handleClickOpen()}}
              onMouseEnter={()=>{setDeleteIcon(true)}}
              onMouseLeave={()=>{setDeleteIcon(false)}}
              >
              {deleteIcon ? <DeleteForeverIcon/> :  <DeleteForeverOutlinedIcon color="disabled"/>}
            </Button>
            <DeleteDialog
              open={open}
              onClose={handleClickOpen}
              holidayId={id}
              destination={destination}
              />
            <Button size="small" color="secondary" 
              onClick={()=>{handleClickOpenEdit()}}
              onMouseEnter={()=>{setEditIcon(true)}}
              onMouseLeave={()=>{setEditIcon(false)}}
              > 
            {editIcon ? <EditIcon/> : <EditOutlinedIcon color="disabled"/>}
            </Button>
            <EditDialog
              open={openEdit}
              onClose={handleClickOpenEdit}
              holidayId={id}
              destination={destination}
              start_date={start_date} 
              end_date={end_date} 
              price={price} 
              picture={picture}
              />
          </CardActions>
        </Card>
              </Paper>
            </Grow>
      </Grid>
  );
};