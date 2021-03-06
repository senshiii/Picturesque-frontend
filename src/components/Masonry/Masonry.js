import React, { useCallback } from 'react';
import { connect } from 'react-redux';

import classes from './Masonry.module.css';
import MasonryItem from './MasonryItem/MasonryItem';
import * as actions from '../../store/actions/actions';
import rootRef from '../../firebase/firebase';

const Masonry = (props) => {
	let imgCols = [ [], [], [] ];

	let x = 0;
	for (let i = 0; i < props.images.length; i++) {
		if (props.filter === 'Public' && props.images[i].access === 'public') {
			imgCols[x++].push(props.images[i]);
		} else if (props.filter === 'Private' && props.images[i].access === 'private') {
			imgCols[x++].push(props.images[i]);
		} else if (props.filter === 'All') {
			imgCols[x++].push(props.images[i]);
		}
		if (x >= 3) x = 0;
	}

	const { delImg } = props;

	const deleteImageHandler = useCallback(
		(name, userId, imgId) => {
			let delRef = rootRef.child(`images/${name}`);
			delRef
				.delete()
				.then(() => {
					delImg(userId, imgId);
				})
				.catch((err) => {
					console.log(err);
				});
		},
		[ delImg ]
	);

	let masonryView = null;
	let emptyCheck = imgCols.filter((el) => el.length > 0);
	if (emptyCheck.length > 0) {
		let col1 = imgCols[0].map((el) => (
			<MasonryItem
				profile={props.profile}
				delete={() => deleteImageHandler(el.name, props.id, el._id)}
				key={el._id}
				src={el.dataUrl}
				created={new Date(el.createdAt).toLocaleDateString()}
				tags={el.tags}
				access={el.access}
				owner={el.owner}
			/>
		));
		let col2 = imgCols[1].map((el) => (
			<MasonryItem
				profile={props.profile}
				delete={() => deleteImageHandler(el.name, props.id, el._id)}
				key={el._id}
				src={el.dataUrl}
				created={new Date(el.createdAt).toLocaleDateString()}
				tags={el.tags}
				access={el.access}
				owner={el.owner}
			/>
		));
		let col3 = imgCols[2].map((el) => (
			<MasonryItem
				profile={props.profile}
				delete={() => deleteImageHandler(el.name, props.id, el._id)}
				key={el._id}
				src={el.dataUrl}
				created={new Date(el.createdAt).toLocaleDateString()}
				tags={el.tags}
				access={el.access}
				owner={el.owner}
			/>
		));
		masonryView = (
			<div className={classes.Masonry}>
				<div className={classes.MasonryColumn}>{col1}</div>
				<div className={classes.MasonryColumn}>{col2}</div>
				<div className={classes.MasonryColumn}>{col3}</div>
			</div>
		);
	} else {
		masonryView = (
			<div className={classes.NoImgs}>
				<h1>Uhh..No Images Here..</h1>
			</div>
		);
	}

	return masonryView;
};

const mapStatetoProps = (state) => {
	return {
		id: state.auth.id
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		delImg: (userId, imgId) => dispatch(actions.delImg(userId, imgId))
	};
};

export default connect(mapStatetoProps, mapDispatchToProps)(Masonry);
