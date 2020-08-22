import { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/actions';

const Logout = (props) => {
	useEffect(
		() => {
			console.log(props);
			console.log('Mounting Logout');
			props.logout();
			props.clear();
			props.history.replace('/')
		},
		[props]
	);
	return null;
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
