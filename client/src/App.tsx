import React from 'react';
import './App.css';
import { BrowserRouter, Switch } from "react-router-dom";
import Navbar from './components/navbar';
import { AppRoutes } from './components/appRouter/routers';
import { routes } from './components/appRouter/routers.config';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './style';


const App: React.FC = () => {
  return (
    <div>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>
      <BrowserRouter>
      <Navbar/>
      <Switch>
        <AppRoutes routes={routes}/>
      </Switch>
      </BrowserRouter>
      </MuiThemeProvider>
    </div>
  );
};

export default App;