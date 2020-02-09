import React from 'react';
import MailIcon from '@material-ui/icons/Mail';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import BarChartIcon from '@material-ui/icons/BarChart';


export function getRouteIcon(title: string) {
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
  };
};