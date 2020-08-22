import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './Footer.module.css';

const Footer = (props) => {
	return (
		<div className={classes.Footer}>
			<div className={classes.Links}>
				<div className={classes.Left}>
					<h1>Picturesque</h1>
				</div>
				<div className={classes.Divider} />
				<div className={classes.Right}>
					<NavLink to="/about">About</NavLink>
					{props.isAuth ? (
						<NavLink to="/profile">Profile</NavLink>
						) : (
							<Fragment>
							<NavLink to="/login">Login</NavLink>
							<NavLink to="/register">Register</NavLink>
						</Fragment>
					)}
				</div>
			</div>
			<div className={classes.Author}>
				<p>Made with ❤ by Sayan Das. &copy;Sayan Das.</p>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		isAuth: state.auth.isAuth
	};
};
export default connect(mapStateToProps)(Footer);
