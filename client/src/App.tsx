import React from 'react';
import './App.css';
import { BrowserRouter, Switch } from "react-router-dom";
import Navbar from './components/navbar';
import { AppRoutes } from './components/appRouter/routers';
import { routes } from './components/appRouter/routers.config';
import CssBaseline from '@material-ui/core/CssBaseline';

const App: React.FC = () => {
  return (
    <div>
      <CssBaseline />
      <BrowserRouter>
      <Navbar/>
      <Switch>
        <AppRoutes routes={routes}/>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
