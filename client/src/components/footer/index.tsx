import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';



export default function Footer() {
    const classes = useStyles();
    return (
      <footer className={classes.footer}>
      <Typography variant="h6" align="center" gutterBottom>
       Full Stack Web Development Project
      </Typography>
      <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
        React-Redux | Node.js | MySQL | Material UI
      </Typography>
      <Copyright />
    </footer>
    )
}

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'By Adir Avraham '}
      </Typography>
    );
  }
  
const useStyles = makeStyles(theme => ({
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));