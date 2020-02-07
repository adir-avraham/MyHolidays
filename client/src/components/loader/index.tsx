import React from 'react';
import { Container } from '@material-ui/core';
import { useStyles } from './style';


export default function LinearIndeterminate() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
    <div className={classes.root}>
      <img src="https://assetmaritime.in/wp-content/uploads/2018/12/loading.gif" alt="Loading"/>
    </div>
    </Container>
  );
};