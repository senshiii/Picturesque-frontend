import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions/actions';

const Logout = (props) => {
    const [logout, setlogout] = useState(false)
    useEffect(
		() => {
            props.logout();
            setlogout(true);
		},
		[ props ]
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
		logout: () => dispatch(actions.logout())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
