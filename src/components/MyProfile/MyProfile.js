import React, { useState, useEffect, memo, Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import classes from './MyProfile.module.css';
import UP from '../../assets/images/user_placeholder.png';
import Upload from '../Upload/Upload';
import Masonry from '../Masonry/Masonry';
import Spinner from '../UI/Spinner/Spinner';

import * as actions from '../../store/actions/actions';

const MyProfile = (props) => {
	// if (!props.isAuth) props.history.goBack();

	const [ filter, setFilter ] = useState('All');
	const [ showUpload, setShowUpload ] = useState(false);

	useEffect(
		() => {
			// console.log(props.profile);
			if (props.isAuth && props.profile === null) {
				// console.log('Profile Use effect');
				props.getMyProfileInfo(props.id, props.token);
			}
		},
		[ props ]
	);

	let view = null;
	if (props.loading) {
		// console.log('Waiting for Profile');
		view = (
			<div
				style={{
					textAlign: 'center',
					margin: '0 auto',
					width: '90vw',
					height: '88vh',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<Spinner />
			</div>
		);
	} else if (!props.loading && props.profile !== null) {
		// console.log('Rendering MyProfile');
		const { name, bio, storage, images, dpUrl, email, socials } = props.profile;
		let subView = (
			<Fragment>
				<div className={classes.UploadSection}>
					<div className={classes.Storage}>
						<h3>Storage Usage</h3>
						<progress value={parseFloat(storage).toFixed(2)} max="100" />
						<span>
							Private storage used: <strong> {parseFloat(storage).toFixed(2)} /100 MB</strong>
						</span>
					</div>
					<button onClick={(e) => setShowUpload(true)}>Upload</button>
				</div>
				<div>
					<div className={classes.Heading}>
						<h2> Your Images</h2>
						<span className={classes.Filter}>
							<select value={filter} onChange={(e) => setFilter(e.target.value)}>
								<option>All</option>
								<option>Public</option>
								<option>Private</option>
							</select>
							<ion-icon name="options" />
						</span>
					</div>
					<Masonry images={images} filter={filter} profile />
				</div>
			</Fragment>
		);
		if (props.location.search) {
			subView = <p>Settings</p>;
		}
		view = (
			<div className={classes.ProfileWrapper}>
				{showUpload && <Upload history={props.history} closeUpload={() => setShowUpload(false)} />}
				<div className={classes.ProfileInfo}>
					<div className={classes.Left}>
						<div className={classes.DP}>
							<img src={dpUrl ? dpUrl : UP} alt="DP" />
							<NavLink
								to={{
									pathname: '/profile',
									search: '?v=settings'
								}}
								className={classes.DP_Edit}
							>
								<ion-icon size="large" name="add-circle" />
							</NavLink>
						</div>
						<p className={classes.Email}>
							<ion-icon name="mail" />&nbsp;{email}
						</p>
						<NavLink className={classes.Switch} to="/profile?v=settings">
							<ion-icon name="settings-outline" />
							&nbsp; Settings
						</NavLink>
					</div>
					<div className={classes.Right}>
						<h3 className={classes.Name}> {name} </h3>
						{
							<p className={classes.Bio}>
								<span>Bio</span>
								<br />
								{/* {bio} */}
								Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
								has been the industry's standard dummy text ever since the 1500s, when an unknown
								printer took a galley of type and scrambled it to make a type specimen book. It has
								survived not only five centuries, but also the leap into electronic typesetting,
								remaining essentially unchanged.
							</p>
						}
						{
							<div className={classes.Socials}>
								<h6>Follow Me: </h6>
								<ion-icon name="logo-facebook" />
								<ion-icon name="logo-instagram" />
								<ion-icon name="logo-pinterest" />
							</div>
						}
						{/* <div className={classes.CompleteYourProfile}>
							<h4>Some quick steps...</h4>
							<ol>
								{!bio && <li>Add Bio</li>}
								{!socials.length > 0 && <li>Add Social Links</li>}
								{!dpUrl && <li>Add Display Picture</li>}
							</ol>
							<NavLink to="/profile?v=settings" className={classes.AddBio}>
								Complete Your Profile
							</NavLink>
						</div> */}
					</div>
				</div>
				<div className={classes.ProfileContent}>{subView}</div>
			</div>
		);
	}
	return view;
};

const mapStateToProps = (state) => {
	return {
		isAuth: state.auth.isAuth,
		id: state.auth.id,
		token: state.auth.token,
		profile: state.profile.profile,
		loading: state.profile.loading
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getMyProfileInfo: (id, token) => dispatch(actions.profile(id, token))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(MyProfile));
