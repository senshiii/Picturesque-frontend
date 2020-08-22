import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import classes from './MasonryItem.module.css';
import DP from '../../../assets/images/user_placeholder.png';

const MasonryItem = (props) => {
	return (
		<div className={classes.MasonryItem}>
			<img src={props.src} alt="Main" />
			{props.profile ? (
				<Fragment>
					<div className={classes.ImgActions}>
						<h3>Uploaded on: {props.created} </h3>
						<button className={classes.Delete} onClick={props.delete}>
							<ion-icon name="trash" />
						</button>
					</div>
					<div>
						{props.access === 'public' ? props.tags.length > 0 ? (
							<Fragment>
								<strong style={{ fontFamily: 'Roboto' }}>Tags:</strong>
								{props.tags.map((el) => (
									<p key={el} className={classes.Tag}>
										{el}
									</p>
								))}
							</Fragment>
						) : (
							<p style={{ fontFamily: 'Roboto', marginBottom: '7px' }}>
								<strong>Tags:</strong> No Tags found
							</p>
						) : (
							<p className={[ classes.PrivateTag, classes.Tag ].join(' ')}>
								<ion-icon name="lock-closed" />&nbsp;Private
							</p>
						)}
					</div>
				</Fragment>
			) : (
				<div className={classes.Info}>
					<img src={props.owner.dpurl ? props.owner.dpUrl : DP} title={props.owner.name} alt="DP" className={classes.DP} />
					<NavLink to={`/${props.owner._id}/profile`} className={classes.Name} >{props.owner.name}</NavLink>
					<ion-icon name="download-outline" title="Download Image" />
					<ion-icon name="share-social" title="Share Image" />
				</div>
			)}
		</div>
	);
};

export default MasonryItem;
