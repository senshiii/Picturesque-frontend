import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

// Components Import
import classes from './Auth.module.css';
import RegisterSVG from '../../assets/logos/register.svg';
// import Spinner from '../UI/Spinner/Spinner';
// Actions Import
import * as actions from '../../store/actions/actions';
// Resources Import
import LoginSVG from '../../assets/logos/login.svg';

const Auth = (props) => {
	const [ name, setName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ pass, setPass ] = useState('');
	const [ confPass, setConfPass ] = useState('');
	const [alert, setAlert] = useState(null);

	const { error } = props;
	useEffect(() => {
		if(error){
			setAlert(error.message);
			setName('')
			setEmail('')
			setConfPass('')
			setPass('')
		}
	}, [error, setAlert])

	if (props.isAuth) {
		return <Redirect to="/profile" />;
	}

	const registerHandler = () => {
		if(pass === confPass){
			props.registerUser(name, email, pass);
		}else{
			setAlert('Password\'s do not match.');
		}
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
			<div className={classes.SubmitandError}>
				<button disabled={props.loading} className={classes.SubmitBtn} onClick={registerHandler}>
					Login
				</button>
				{alert && (
					<div className={classes.ErrorAlert}>
						<ion-icon name="alert-circle-outline" />
						&nbsp;
						<p> {error.message} </p>
					</div>
				)}
			</div>
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
				<div className={classes.SubmitandError}>
					<button disabled={props.loading} className={classes.SubmitBtn} onClick={loginHandler}>
						Login
					</button>
					{alert && (
						<div className={classes.ErrorAlert}>
							<ion-icon name="alert-circle-outline" />
							&nbsp;
							<p> {error.message} </p>
						</div>
					)}
				</div>
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
		isAuth: state.auth.isAuth,
		loading: state.auth.loading,
		error: state.auth.error
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		registerUser: (name, email, password) => dispatch(actions.register(name, email, password)),
		loginUser: (email, password) => dispatch(actions.login(email, password))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
