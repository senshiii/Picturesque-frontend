import React, { Fragment, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './Navbar.module.css';
import Backdrop from '../Backdrop/Backdrop';

const Navbar = (props) => {
	const [ show, setShow ] = useState(false);

	return (
		<Fragment>
			<div className={classes.Navbar}>
				<p className={classes.MenuIcon} onClick={e => setShow(!show)} >
					<ion-icon name="menu-outline" />
				</p>
				<NavLink to="/" className={classes.NavbarBrand}>
					Picturesque
				</NavLink>
				<div className={classes.Nav}>
					<nav className={classes.NavbarNavLeft}>
						<NavLink to="/about">About</NavLink>
						<NavLink to="/api">API</NavLink>
						{!props.isAuth && <NavLink to="/register">Create</NavLink>}
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
			<div
				className={
					show ? [ classes.Show ].join(' ') : [ classes.Close ].join(' ')
				}
			>
				<Backdrop close={e => setShow(!show)} />
				<div className={classes.SideNav} onClick={e => setShow(!show)} >
					<h1>Menu</h1>
					<div className={classes.NavMobile}>
						<NavLink onClick={e => setShow(!show)} to="/">Home</NavLink>
						{props.isAuth ? (
							<Fragment>
								<NavLink onClick={e => setShow(!show)} to="/profile">Profile</NavLink>
								<NavLink onClick={e => setShow(!show)} to="/logout">Logout</NavLink>
							</Fragment>
						) : (
							<Fragment>
								<NavLink onClick={e => setShow(!show)} to="/login">Login</NavLink>
								<NavLink onClick={e => setShow(!show)} to="/register">Register</NavLink>
							</Fragment>
						)}
					</div>
				</div>
			</div>
		</Fragment>
	);
};

const mapStateToProps = (state) => {
	return {
		isAuth: state.auth.isAuth
	};
};

export default connect(mapStateToProps)(Navbar);
