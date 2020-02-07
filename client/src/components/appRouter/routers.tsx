import React from 'react'; 
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import { Link, Route } from 'react-router-dom';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import BarChartIcon from '@material-ui/icons/BarChart';



export const AppLinks = (props: IAppLinksProps) => {
  const classes = useStyles();
  const { routes, role } = props;
  if (role === "admin") { 
    return routes.filter((route: IRoute) => (route.authorized === "admin" || route.authorized === "both") && !route.exact ).map((route: IRoute) => (
      <Link key={route.title} className={classes.link} to={route.path}> 
        <ListItem button >
        <ListItemIcon>{getItemIcon(route.title)}</ListItemIcon>
        <ListItemText primary={route.title} />
        </ListItem>
        </Link>
    ))} 
    else if (role === "user") {
      return routes.filter((route: IRoute) => (route.authorized === "user" || route.authorized === "both") && !route.exact ).map((route: IRoute) => (
        <Link key={route.title} className={classes.link} to={route.path}> 
        <ListItem button >
        <ListItemIcon>{getItemIcon(route.title)}</ListItemIcon>
        <ListItemText primary={route.title} />
        </ListItem>
        </Link>
      ))} 
      else {
        return routes.filter((route: IRoute) => route.authorized === "guest" && !route.exact).map((route: IRoute) => (
          <Link key={route.title} className={classes.link} to={route.path}> 
          <ListItem button >
          <ListItemIcon>{getItemIcon(route.title)}</ListItemIcon>
          <ListItemText primary={route.title} />
          </ListItem>
          </Link>
        ))
      }
    }
    
    
    function getItemIcon(title: string) {
      switch (title) {
        case 'Login': {
          return <LockOpenOutlinedIcon />;
        }
        case 'Logout': {
          return <LockOutlinedIcon />;
        }
        case 'Register': {
          return <PersonAddOutlinedIcon />;
        }
        case 'MyHolidays': {
          return <BeachAccessIcon />;
        }
        case 'Create-holiday': {
      return <FlightTakeoffIcon />;
    }
    case 'Report': {
      return <BarChartIcon />;
    }
    case 'Holidays': {
      return <BeachAccessIcon />;
    }
    default: {
        return <MailIcon />;
      }
  }
}

export const AppRoutes = (props: IAppRoutesProps) => {
  const { routes } = props;
  const result = routes.map((route: IRoute) => 
      <Route key={route.title} path={route.path} component={route.component} exact={route.exact}/> 
      )
  return <>{result}</>
}

interface IRoute {
  authorized: string;
  title: string; 
  path: string;
  component: any;
  exact?: boolean;
}
interface IAppRoutesProps {
  routes: Array<IRoute>
}

interface IAppLinksProps {
  routes: any;
  role: string;
}


const useStyles = makeStyles((theme: Theme) =>
createStyles({
  link: {
        textDecoration: 'none',
        color: "#000",
    }
  }),
);


