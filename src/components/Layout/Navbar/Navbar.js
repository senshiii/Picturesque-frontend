import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './Navbar.module.css';

const Navbar = (props) => {
	return (
		<div className={classes.Navbar}>
			<NavLink to="/" className={classes.NavbarBrand}>
				Picturesque
			</NavLink>
			<div className={classes.Nav}>
				<nav className={classes.NavbarNavLeft}>
					<NavLink to="/about">About</NavLink>
					<NavLink to="/api">API</NavLink>
					<NavLink to="/add" className={classes.UploadPicture}>
						Upload Picture
					</NavLink>
				</nav>
				{!props.isAuth ? (
					<nav className={classes.NavbarNavRight}>
						<NavLink to="/register">Register</NavLink>
						<NavLink to="/login">Login</NavLink>
					</nav>
				) : (
					<nav className={classes.NavbarNavRight}>
						<NavLink to="/profile">Profile</NavLink>
						<NavLink to="/logout">Logout</NavLink>
					</nav>
				)}
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		isAuth: state.auth.isAuth
	};
};

export default connect(mapStateToProps)(Navbar);
