import React, { useState } from 'react';
import { connect } from 'react-redux';

import classes from './Profile.module.css';
import DP from '../../assets/images/dp.jpg';
import Upload from '../Upload/Upload';

const Profile = (props) => {
	// if(!props.isAuth) props.history.goBack();

	const [ showUpload, setShowUpload ] = useState(false);

	return (
		<div className={classes.ProfileWrapper}>
			{showUpload && <Upload showUpload={showUpload} closeUpload={() => setShowUpload(false)} />}
			<div className={classes.ProfileInfo}>
				<img src={DP} alt="DP" className={classes.DP} />
				<h3 className={classes.Name}>Name</h3>
				<p className={classes.Bio}>
					<span>Bio</span>
					<br />
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a semper justo. Vivamus fringilla,
					nisi id vehicula commodo, libero nibh elementum lectus, vitae varius quam augue eu metus. Nunc
					rhoncus iaculis gravida. Phasellus pretium felis non feugiat lacinia. Etiam sit amet erat eros.
					Donec viverra, libero imperdiet varius malesuada,
				</p>
				<div className={classes.Likes}>
					<ion-icon style={{ color: 'red' }} size="small" name="heart-circle" />
					<span>Likes: </span>
					<span>100</span>
				</div>
				<div className={classes.Socials}>
					<ion-icon name="logo-facebook" />
					<ion-icon name="logo-instagram" />
					<ion-icon name="logo-pinterest" />
				</div>
			</div>
			<div className={classes.ProfileContent}>
				<button onClick={(e) => setShowUpload(true)} >Upload</button>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		isAuth: state.auth.isAuth
	};
};

export default connect(mapStateToProps)(Profile);
