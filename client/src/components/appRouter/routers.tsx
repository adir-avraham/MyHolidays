import React from 'react'; 
import { routes } from './routers.config';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
//import Link from '@material-ui/core/Link';
import { Link, Route } from 'react-router-dom';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import Divider from '@material-ui/core/Divider';


interface route {
  isVisibale: boolean;
  title: string; 
  path: string;
  component: any;
}

export const AppLinks = (props: any) => {
    const classes = useStyles();
    const { routes } = props;

    return routes.filter((route: route) => route.isVisibale).map((route: route, index: number) => (
        <Link key={route.title} className={classes.link} to={route.path}> 
        <ListItem button >
        <ListItemIcon>{getItemIcon(route.title)}</ListItemIcon>
        <ListItemText primary={route.title} />
        </ListItem>
        </Link>
    ))
}

function getItemIcon(title: string) {
  switch (title) {
    case 'Login': {
        return <LockOpenOutlinedIcon />;
    }
    case 'Register': {
        return <PersonAddOutlinedIcon />;
    }
    case 'Holidays': {
      return <BeachAccessIcon />;
  }
    case 'Create-holiday': {
      return <FlightTakeoffIcon />;
    }
    default: {
        return <MailIcon />;
    }
  }
}

export const AppRoutes = (props: any) => {
  const { routes } = props
  const result = routes.map((route: route) => 
      <Route path={route.path} component={route.component}/> 
  )
  return <>{result}</>
}


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
        textDecoration: 'none',
        color: "#000",
    }
  }),
);





// export const AppLinks = (props: any) => {
//   const classes = useStyles();
//   const { routes } = props;

//   return routes.filter((route: route) => route.isVisibale).map((route: route, index: number) => (
//       <Link key={route.title} className={classes.link} to={route.path}> 
//       <ListItem button >
//       <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
//       <ListItemText primary={route.title} />
//       </ListItem>
//       </Link>
//   ))
// }

