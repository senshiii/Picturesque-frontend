import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './Auth.module.css';
import RegisterSVG from '../../assets/logos/register.svg';
import LoginSVG from '../../assets/logos/login.svg';
import * as actions from '../../store/actions/actions';

const Auth = (props) => {
	const [ name, setName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ pass, setPass ] = useState('');
	const [ confPass, setConfPass ] = useState('');
	// const [ dp, setDp ] = useState();

	if (props.isAuth) {
		return <Redirect to="/profile" />;
	}

	const registerHandler = () => {
		props.registerUser(name, email, pass);
	};

	const loginHandler = () => {
		props.loginUser(email, pass);
	};

	let form = (
		<div className={classes.AuthForm}>
			<h1>Fill the form</h1>
			<div className={classes.FormEl}>
				<label htmlFor="name">Name</label>
				<input
					id="name"
					type="text"
					placeholder="Enter name"
					value={name}
					autoComplete="off"
					onChange={(e) => setName(e.target.value)}
				/>
			</div>
			<div className={classes.FormEl}>
				<label htmlFor="email">Email</label>
				<input
					id="email"
					type="email"
					autoComplete="off"
					placeholder="Enter email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<div className={classes.FormEl}>
				<label htmlFor="password">Password</label>
				<input
					id="password"
					type="password"
					placeholder="Enter password"
					value={pass}
					onChange={(e) => setPass(e.target.value)}
				/>
			</div>
			<div className={classes.FormEl}>
				<label htmlFor="confPass">Re-Enter Password</label>
				<input
					ifd="confPass"
					type="password"
					placeholder="Re-enter password"
					value={confPass}
					onChange={(e) => setConfPass(e.target.value)}
				/>
			</div>
			<button className={classes.SubmitBtn} onClick={registerHandler}>
				Register
			</button>
		</div>
	);

	if (props.login)
		form = (
			<div className={classes.AuthForm}>
				<h1>Fill the form</h1>
				<div className={classes.FormEl}>
					<label htmlFor="email">Email</label>
					<input
						id="email"
						type="email"
						autoComplete="off"
						placeholder="Enter email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className={classes.FormEl}>
					<label htmlFor="password">Password</label>
					<input
						id="password"
						type="password"
						placeholder="Enter password"
						value={pass}
						onChange={(e) => setPass(e.target.value)}
					/>
				</div>
				<button className={classes.SubmitBtn} onClick={loginHandler}>
					Login
				</button>
			</div>
		);

	return (
		<div className={classes.Auth}>
			<div className={classes.AuthImg}>
				{props.login ? (
					<h1>Pick up where you left off!</h1>
				) : (
					<h1>Register Now and start adding pictures for the world to admire!</h1>
				)}
				{props.login ? <img src={LoginSVG} alt="Login Idea" /> : <img src={RegisterSVG} alt="Register Idea" />}
			</div>
			<div className={classes.AuthFormContainer}>{form}</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		isAuth: state.auth.isAuth
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		registerUser: (name, email, password) => dispatch(actions.register(name, email, password)),
		loginUser: (email, password) => dispatch(actions.login(email, password))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
