import React, { useState, useEffect, memo, Fragment } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import classes from './Profile.module.css';
import UP from '../../assets/images/user_placeholder.png';
import Masonry from '../Masonry/Masonry';
import Spinner from '../UI/Spinner/Spinner';

const Profile = (props) => {
	const [ loading, setLoading ] = useState(true);
	const [ profile, setProfile ] = useState(null);
	useEffect(
		() => {
			const id = props.match.params.userId;
			if (props.id === id) props.history.replace('/profile');
			else {
				// console.log(id);
				axios
					.get(`http://localhost:8080/user/${id}/profile`)
					.then((res) => {
						setProfile(res.data);
						setLoading(false);
						// console.log('Profile: ', res.data);
					})
					.catch((err) => {
						console.log(err);
					});
			}
		},
		[ props ]
	);

	let view = null;
	if (loading) {
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
	} else {
		// console.log('Rendering Profile');
		const { name, bio, images, dpUrl, email, socials } = profile;
		view = (
			<div className={classes.ProfileWrapper}>
				<div className={classes.ProfileInfo}>
					<div className={classes.Left}>
						<div className={classes.DP}>
							<img src={dpUrl ? dpUrl : UP} alt="DP" />
						</div>
						<p className={classes.Email}>
							<ion-icon name="mail" />&nbsp;{email}
						</p>
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
					</div>
				</div>
				<div className={classes.ProfileContent}>
					<div className={classes.Heading}>
						<h2> {name.split(' ')[0]}'s Images</h2>
					</div>
					<Masonry images={images} filter="All" />
				</div>
			</div>
		);
	}
	return view;
};

const mapStateToProps = (state) => {
	return {
		id: state.auth.id
	};
};

export default connect(mapStateToProps)(memo(Profile));
