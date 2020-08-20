import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

import classes from './Home.module.css';
import Masonry from '../Masonry/Masonry';
import Spinner from '../UI/Spinner/Spinner';

const Home = (props) => {
	const [ images, setImages ] = useState();
	const [ search, setSearch ] = useState('');
	const [ tag, setTag ] = useState('');
	useEffect(
		() => {
			if (!tag) {
				axios
					.get('http://localhost:8080/images')
					.then((res) => {
						setImages(res.data);
					})
					.catch((err) => {
						console.log(err);
					});
			}
		},
		[ tag ]
	);

	let imgView = <Spinner />;
	if (images) {
		imgView = <Masonry images={images} filter="All" />;
	}

	const searchHandler = useCallback(
		() => {
			setImages(null)
			axios
				.get(`http://localhost:8080/images?tag=${search}`)
				.then((res) => {
					setSearch('');
					setTag(res.data.tag);
					setImages(res.data.images);
				})
				.catch((err) => {
					console.log(err);
				});
		},
		[ search ]
	);

	return (
		<div className={classes.Home}>
			<div className={classes.SearchWrapper}>
				<div className={classes.Search}>
					<h1>
						"Photography takes an instant out of time, altering life by holding it still" <br />
						<cite>~ Dorothea Lange</cite>
					</h1>
					<div className={classes.SearchInput}>
						<input
							type="text"
							placeholder="Search photos by tags(or categories)"
							value={search}
							disabled={!images}
							onChange={(e) => setSearch(e.target.value)}
						/>
						<div className={classes.SearchIcon} onClick={searchHandler}>
							<img src="https://img.icons8.com/color/48/000000/search.png" alt="Search Icon" />
						</div>
					</div>
				</div>
				{/* POPULAR CATEGORIES */}
			</div>
			<div className={classes.Heading}>
				<div />
				<h1>Gallery</h1>
				<div />
			</div>
			{tag.length > 0 && (
				<div className={classes.SearchTag}>
					<h2>Showing results for: </h2>
					<span className={classes.Tag}>
						{tag}{' '}
						<span
							onClick={() => {
								setTag('');
								setImages(null);
							}}
						>
							<ion-icon name="close-circle" />
						</span>
					</span>
				</div>
			)}
			{imgView}
		</div>
	);
};

export default Home;
