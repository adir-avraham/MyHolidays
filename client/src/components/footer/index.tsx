import React from 'react';
import { Typography } from '@material-ui/core';
import { useStyles } from './style';



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
      <Typography variant="body2" color="textSecondary" align="center">
        {'By Adir Avraham '}
      </Typography>
    </footer>
    )
};