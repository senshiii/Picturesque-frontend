import React, { useEffect, memo } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './store/actions/actions';
import Navbar from './components/Layout/Navbar/Navbar';
import Home from './components/Home/Home'
import Profile from './components/MyProfile/MyProfile';
import Auth from './components/Auth/Auth';
import Logout from './components/Logout/Logout';
import './App.css';

const App = props => {

  useEffect(() => {
    let token = localStorage.getItem('token');
    let id = localStorage.getItem('id');
    if(token && id) props.setAuth(id, token);
  }, [props]);
  
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

const mapDispatchToProps = dispatch => {
  return {
    setAuth: (id,token) => dispatch(actions.authSuccess(id, token))
  }
}

export default connect(null, mapDispatchToProps)(memo(App));
