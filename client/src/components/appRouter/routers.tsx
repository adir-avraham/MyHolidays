import React from 'react'; 
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link, Route } from 'react-router-dom';
import { getRouteIcon } from './getRouteIcon';
import { IAppLinksProps, IRoute, IAppRoutesProps } from 'sharing-interfaces';
import { useStyles } from './style';


export const AppLinks = (props: IAppLinksProps) => {
  const classes = useStyles();
  const { routes, role, handleDrawerOpen } = props;
  switch (role) {
    case "admin": { 
      return routes.filter((route: IRoute) => (route.authorized === "admin" || route.authorized === "both") && !route.exact )
      .map((route: IRoute) => (
      <Link key={route.title} className={classes.link} to={route.path}> 
        <ListItem button onClick={()=>{handleDrawerOpen()}} >
        <ListItemIcon>{getRouteIcon(route.title)}</ListItemIcon>
        <ListItemText primary={route.title} />
        </ListItem>
        </Link>
    ))} 
    case "user": {
      return routes.filter((route: IRoute) => (route.authorized === "user" || route.authorized === "both") && !route.exact )
      .map((route: IRoute) => (
        <Link key={route.title} className={classes.link} to={route.path}> 
        <ListItem button onClick={()=>{handleDrawerOpen()}}>
        <ListItemIcon>{getRouteIcon(route.title)}</ListItemIcon>
        <ListItemText primary={route.title} />
        </ListItem>
        </Link>
      ))} 
      default: {
        return routes.filter((route: IRoute) => route.authorized === "guest" && !route.exact)
        .map((route: IRoute) => (
          <Link key={route.title} className={classes.link} to={route.path}> 
          <ListItem button onClick={()=>{handleDrawerOpen()}}>
          <ListItemIcon>{getRouteIcon(route.title)}</ListItemIcon>
          <ListItemText primary={route.title} />
          </ListItem>
          </Link>
        ))
    }
  };
};
    
    
export const AppRoutes = (props: IAppRoutesProps) => {
  const { routes } = props;
  const result = routes.map((route: IRoute) => 
      <Route key={route.title} path={route.path} component={route.component} exact={route.exact}/> 
      )
  return <>{result}</>
};