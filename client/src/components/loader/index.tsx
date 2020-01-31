import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

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
      <img src="https://assetmaritime.in/wp-content/uploads/2018/12/loading.gif" alt="Loading"/>
    </div>
    </Container>
  );
}