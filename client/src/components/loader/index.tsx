import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Container, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }),
);

export default function LinearIndeterminate() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
    <div className={classes.root}>
      {/* <LinearProgress />
      <LinearProgress color="secondary" /> */}

      <img src="https://assetmaritime.in/wp-content/uploads/2018/12/loading.gif"/>
    
    </div>
    </Container>
  );
}