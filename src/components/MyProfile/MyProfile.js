import React, { useState, useEffect, memo } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import classes from './MyProfile.module.css';
import UP from '../../assets/images/user_placeholder.png';
import Upload from '../Upload/Upload';
import Masonry from '../Masonry/Masonry';
import Spinner from '../UI/Spinner/Spinner';

import * as actions from '../../store/actions/actions';

const Profile = (props) => {
	if (!props.isAuth) props.history.goBack();

	const [ filter, setFilter ] = useState('All');
	const [ showUpload, setShowUpload ] = useState(false);

	useEffect(
		() => {
			if (props.isAuth && !props.profile) {
				// console.log('Profile Use effect');
				props.getProfileInfo(props.id);
			}
		},
		[ props ]
	);

	let view = null;
	if (props.loading) {
		view = (
			<div style={{textAlign: 'center', marginTop: '20vh'}} >
				<Spinner />
			</div>
		);
	} else if (!props.loading && props.profile) {
		// console.log(props.profile);
		const { name, bio, storage, images, dpUrl } = props.profile;
		view = (
			<div className={classes.ProfileWrapper}>
				{showUpload && (
					<Upload
						history={props.history}
						closeUpload={() => setShowUpload(false)}
					/>
				)}
				<div className={classes.ProfileInfo}>
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
					<h3 className={classes.Name}> {name} </h3>
					<p className={classes.Bio}>
						<span>Bio</span>
						<br />
						{bio ? (
							bio
						) : (
							<NavLink
								to={{
									pathname: '/profile',
									search: '?v=settings'
								}}
								className={classes.Add_Bio}
							>
								Add Bio
							</NavLink>
						)}
					</p>
					{/* <div className={classes.Likes}>
						<ion-icon style={{ color: 'red' }} size="small" name="heart-circle" />
						<span>Likes: </span>
						<span>100</span>
					</div> */}
					<div className={classes.Socials}>
						<h6>Follow Me: </h6>
						<ion-icon name="logo-facebook" />
						<ion-icon name="logo-instagram" />
						<ion-icon name="logo-pinterest" />
					</div>
				</div>
				<div className={classes.ProfileContent}>
					<div className={classes.UploadSection}>
						<div className={classes.Storage}>
							<h3>Storage Usage</h3>
							<progress value={storage.toFixed(2)} max="100" />
							<span>
								Private storage used: <strong> {storage.toFixed(2)} /100 MB</strong>
							</span>
						</div>
						<button onClick={(e) => setShowUpload(true)}>Upload</button>
					</div>
					<div>
						<div className={classes.Heading}>
							<h2> {name.split(' ')[0]}'s Gallery</h2>
							<span className={classes.Filter}>
								<select value={filter} onChange={(e) => setFilter(e.target.value)}>
									<option>All</option>
									<option>Public</option>
									<option>Private</option>
								</select>
								<ion-icon name="options" />
							</span>
						</div>
					</div>
					<Masonry images={images} filter={filter} profile />
				</div>
			</div>
		);
	}
	return view;
};

const mapStateToProps = (state) => {
	return {
		isAuth: state.auth.isAuth,
		id: state.auth.id,
		profile: state.profile.profile,
		loading: state.profile.loading
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getProfileInfo: (id) => dispatch(actions.profile(id))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(Profile));
