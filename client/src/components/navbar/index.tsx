import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
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
import { connect } from 'react-redux'; 
import { State } from 'sharing-interfaces';
import { updateUserNameConnectedAction } from 'redux/actions';

interface INavbarProps extends User {
  reduxActions: UpdateUserNameConnected;
}

interface UpdateUserNameConnected {
  updateUserNameConnected: Function;
}
interface User {
  firstName: string;
  role: string;
}

export function Navbar(props: INavbarProps) {
  
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {open ? setOpen(false) : setOpen(true)};
  
  const { updateUserNameConnected } = props.reduxActions;  
  const { firstName, role } = props;

  useEffect(()=>{
    
    const initReq = async () =>{
      const token = localStorage.getItem('token');
      if (token) {
        const result = await mainAxios.post('/verifyToken');
        const { firstName, role } = result.data;
        if (firstName) updateUserNameConnected(firstName, role)
      } 
    }
    initReq();

  },[])


  return (
    <div className={classes.root}>
      <CssBaseline />
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
          <Typography variant="h6" noWrap>
            / Hello {firstName}
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
        <AppLinks routes={routes} role={role}/>
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
}

const mapStateToProps = (state: State) => {
  const { firstName, role } = state.userNameConnected;
      return { firstName, role };
  }   

  const mapDispatchToProps = (dispatch: Function) => {
    return {
        reduxActions: {
          updateUserNameConnected: (firstName: string, role: string) => {
            dispatch(updateUserNameConnectedAction(firstName, role));
          }
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (Navbar);


const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    link: {
        textDecoration: 'none',
        color: "#000",
    },
    firstName: {
  
    }
  }),
);