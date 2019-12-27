import React from 'react';
import Login from './components/login'
import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Register from './components/register';

const App: React.FC = () => {
  return (
    <div>
      
      <BrowserRouter>
      <Switch>
        <Route path="/register" component={Register}/>
        <Route path="/login" component={Login}/>
        <Route path="**" component={Login}/>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
