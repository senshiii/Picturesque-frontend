import React from 'react';
import { connect } from 'react-redux';

import classes from './Masonry.module.css';
import MasonryItem from './MasonryItem/MasonryItem';
import * as actions from '../../store/actions/actions';

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

	let col1 = imgCols[0].map((el) => (
		<MasonryItem
			profile={props.profile}
			delete={() => props.delImg(props.id, el._id)}
			key={el._id}
			src={el.dataUrl}
		/>
	));
	let col2 = imgCols[1].map((el) => (
		<MasonryItem
			profile={props.profile}
			delete={() => props.delImg(props.id, el._id)}
			key={el._id}
			src={el.dataUrl}
		/>
	));
	let col3 = imgCols[2].map((el) => (
		<MasonryItem
			profile={props.profile}
			delete={() => props.delImg(props.id, el._id)}
			key={el._id}
			src={el.dataUrl}
		/>
	));

	return (
		<div className={classes.Masonry}>
			<div className={classes.MasonryColumn}>{col1}</div>
			<div className={classes.MasonryColumn}>{col2}</div>
			<div className={classes.MasonryColumn}>{col3}</div>
		</div>
	);
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
