import React from 'react';

import classes from './MasonryItem.module.css';
import DP from '../../../assets/images/dp.jpg';

const MasonryItem = (props) => {
	return (
		<div className={classes.MasonryItem}>
			<img src={props.src} alt="Main" />
			{props.profile ? (
				<div className={classes.ImgActions}>
					<button className={classes.Delete} onClick={props.delete}>
						<ion-icon name="trash" />
					</button>
				</div>
			) : (
				<div className={classes.Info}>
					<img src={DP} alt="DP" className={classes.DP}/>
					<h5>Name</h5>
					<ion-icon name="download-outline" />
					<ion-icon name="share-social" />
				</div>
			)}
		</div>
	);
};

export default MasonryItem;
