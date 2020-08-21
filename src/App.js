import React, { useEffect, memo } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './store/actions/actions';
import Navbar from './components/Layout/Navbar/Navbar';
import Home from './components/Home/Home';
import Profile from './components/MyProfile/MyProfile';
import Auth from './components/Auth/Auth';
import Logout from './components/Logout/Logout';

const App = (props) => {
	useEffect(
		() => {
			if(!props.isAuth){
				console.log('Auto-Logging In');
				let token = localStorage.getItem('token');
				let id = localStorage.getItem('id');
				if (token && id) props.setAuth(id, token);
			}
		},
		[ props ]
	);

	console.log('App');
	return (
		<div
			className="App"
			style={{ width: '100vw !important', overflowX: 'hiddden', height: 'auto', margin: 0, padding: 0 }}
		>
			<Navbar />
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/profile" component={Profile} />
				<Route path="/register" component={Auth} />
				<Route path="/login" render={() => <Auth login />} />
				<Route path="/logout" component={Logout} />
			</Switch>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		isAuth: state.auth.isAuth
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setAuth: (id, token) => dispatch(actions.authSuccess(id, token))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(App));
