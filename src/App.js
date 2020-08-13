import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Navbar from './components/Layout/Navbar/Navbar';
import Home from './components/Home/Home'
import Profile from './components/Profile/Profile';
import Auth from './components/Auth/Auth';
import Logout from './components/Logout/Logout';
import './App.css';

const App = props => {
  return (
    <div className="App">
      <Navbar/>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path='/profile' component={Profile} />
        <Route path="/register" component={Auth}/>
        <Route path="/login" render={() => <Auth login />}/>
        <Route path="/logout" component={Logout} />
      </Switch>
    </div>
  );
}

export default App;
