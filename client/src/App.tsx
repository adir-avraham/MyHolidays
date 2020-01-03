import React from 'react';
import Login from './components/login';
import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Register from './components/register';
import Navbar from './components/navbar';
import Holidays from './components/holidays';
import CreateHoliday from './components/create-holiday';

const App: React.FC = () => {
  return (
    <div>
      
      <BrowserRouter>
      <Navbar/>
      <Switch>
        <Route path="/register" component={Register}/>
        <Route path="/login" component={Login}/>
        <Route path="/holidays" component={Holidays}/>
        <Route path="/create-holiday" component={CreateHoliday}/>
        <Route path="**" component={Navbar}/>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
