import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions/actions';

const Logout = (props) => {
	const [ logout, setlogout ] = useState(false);
	useEffect(
		() => {
			console.log('Mounting Logout');
			setlogout(true);
			props.logout();
			props.clear();
		},
		[]
	);

	let view = logout ? <Redirect to="/" /> : null;

	return view;
};

const mapStateToProps = (state) => {
	return {
		isAuth: state.auth.isAuth
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		logout: () => dispatch(actions.logout()),
		clear: () => dispatch(actions.clearProfile())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
