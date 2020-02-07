import React from 'react';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { AppLinks } from "components/appRouter/routers";
import { routes } from "components/appRouter/routers.config";
import { useState, useEffect } from 'react';
import mainAxios from 'components/axios/mainAxios';
import { useDispatch, useSelector } from 'react-redux'; 
import { State } from 'sharing-interfaces';
import { updateUserNameConnectedAction } from 'redux/actions';
import { useStyles } from './style';
import moment from 'moment'

export default function Navbar() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {open ? setOpen(false) : setOpen(true)};
  const firstName = useSelector((state: State)=> (state.userNameConnected.firstName));
  const role = useSelector((state: State)=> (state.userNameConnected.role));

  useEffect(()=>{  
    const initReq = async () =>{
      const token = localStorage.getItem('token');
      if (token) {
        const result = await mainAxios.post('/verifyToken');
        const { firstName, role } = result.data;
        if (firstName) dispatch(updateUserNameConnectedAction(firstName, role));
      } 
    }
    initReq();
  },[])


  return (
    <div className={classes.root}>
      <AppBar
        color="secondary"
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">
            MyHolidays&nbsp;
          </Typography>
          <Typography variant="h6" noWrap className={classes.firstName}>
            {firstName === "Guest" ? "Hello" : getGreeting()} {firstName} 
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerOpen}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
        <AppLinks routes={routes} role={role} handleDrawerOpen={handleDrawerOpen}/>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
      </main>
    </div>
  );
};


function getGreeting() {
  const format = 'HH:mm:ss';

  const morning = moment(moment() ,format),
  beforeTime1 = moment('06:00:00', format),
  afterTime1 = moment('11:00:00', format);
  
  const afternoon = moment(moment() ,format),
  beforeTime2 = moment('11:00:00', format),
  afterTime2 = moment('17:00:00', format);

  const evening = moment(moment() ,format),
  beforeTime3 = moment('17:00:00', format),
  afterTime3 = moment('21:00:00', format);

  const night = moment(moment() ,format),
  beforeTime4 = moment('21:00:00', format),
  afterTime4 = moment('24:00:00', format);
  
  if (morning.isBetween(beforeTime1, afterTime1)) return "Good morning";
  if (afternoon.isBetween(beforeTime2, afterTime2)) return "Good afternoon";
  if (evening.isBetween(beforeTime3, afterTime3)) return "Good evening";
  if (night.isBetween(beforeTime4, afterTime4)) return "Good night";
}